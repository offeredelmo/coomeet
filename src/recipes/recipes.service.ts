import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './entities/recipe.entity';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { PaginationDTO } from 'src/config/pagination.dto';
import { NotFoundError } from 'rxjs';
import { ReviewRecipe } from './entities/reviewRecipe.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { AwsBucketService } from 'src/aws-bucket/aws-bucket.service';
import { v4 as uuidv4 } from 'uuid';
import { UploadFileDto } from 'src/aws-bucket/dto/create-aws-bucket.dto';
import { ObjectId } from "mongodb";
import { match } from 'assert';
import { UpdateRecipeInput } from './dto/update-recipe.input';
@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(ReviewRecipe.name) private recipeReviewModel: Model<ReviewRecipe>,
    private readonly awsBucketService: AwsBucketService,
    private readonly usersService: UsersService

  ) { }

  async findById(_id) {
    const recipe = this.recipeModel.findById(_id)
    if (!recipe) {
      throw new NotFoundException("no se a encontrado la receta")
    }
    return recipe
  }

  async createRecipe(createRecipeInput: CreateRecipeInput) {
    const newRecipe = new this.recipeModel(createRecipeInput)
    await this.usersService.findById(createRecipeInput.user_id)
    newRecipe.user_id = new ObjectId(newRecipe.user_id)
    console.log(newRecipe.save)
    return await newRecipe.save()
  }

  async updateRecipe(updateRecipeInput: UpdateRecipeInput) {
    try {
      console.log()
      const updateRecipe = await this.recipeModel.findOneAndUpdate(
        { _id: new ObjectId(updateRecipeInput._id) },
        {
          $set: updateRecipeInput
        },
        {
          new: true
        }
      )
      console.log(updateRecipe)
      return updateRecipe;
    } catch (error) {
      console.log(error)
    }
  }

  async addImgeToImage(_id: string, file: Express.Multer.File) {
    try {
      console.log(_id)
      console.log("hola")
      const fileExtension = file.originalname.split(".").pop();
      const keyNameUrlImg = `${_id}.${fileExtension}`
      const urlImage = await this.awsBucketService.uploadImageAndReturnUrl(
        new UploadFileDto(
          "doc-preuba-01-117",
          `users/recipe/img/${keyNameUrlImg}`,
          file.buffer,
        )
      ).catch((err) => {
        console.error("Error uploading file to AWS:", err);
        throw new Error("File upload failed");
      });
      await this.recipeModel.findByIdAndUpdate(
        { _id: new ObjectId(_id) },
        {
          $set: { "img_url": `${urlImage.Location}`, "key_img_url": `${urlImage.key}` }
        },
        { new: true }
      )
      return urlImage;
    } catch (error) {
      console.error("Error in addImgeToImage:", error.message);
      throw new Error("Failed to add image to recipe. Please try again.");
    }


  }

  async getRecipe(_id: string) {
    const recipe = await this.recipeModel.findById(_id).populate(
      {
        path: "user_id",
        model: "User",
        select: "_id userName"
      }
    ).exec();
    if (!recipe) {
      throw new NotFoundException("No se a encontrado la receta")
    }
    return recipe
  }

  async listMyRecipes(id: string, page: number = 1, perPage: number = 20) {
    await this.usersService.findById(id)
    const recetas = await this.recipeModel.aggregate(
      [
        {
          '$match': {
            'user_id': '66d3bacdb06708e42f24149d'
          }
        }, {
          '$lookup': {
            'from': 'reviewrecipes',
            'let': {
              'recipe_id': {
                '$toString': '$_id'
              }
            },
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$recipe_id', '$$recipe_id'
                    ]
                  }
                }
              }, {
                '$project': {
                  '_id': 1
                }
              }
            ],
            'as': 'reviews'
          }
        }, {
          '$addFields': {
            'review_count': {
              '$size': '$reviews'
            }
          }
        }
      ]
    )
    return recetas
  }

  async listRecipeRandom(paginationDTO: PaginationDTO) {
    const { page = 1, limit = 10 } = paginationDTO
    const skip = (page - 1) * limit;
    const randomRecipes = await this.recipeModel.aggregate([
      { $sample: { size: 100 } },  // Primero, selecciona 100 recetas aleatorias
      {
        $lookup: {
          from: 'reviewrecipes',
          let: { recipe_id: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$recipe_id', '$$recipe_id']
                }
              }
            }
          ],
          as: 'reviews'
        }
      },
      {
        $addFields: {
          'review_count': {
            '$size': '$reviews'
          }
        }
      },
      { $skip: skip },       // Luego, salta las necesarias según la página
      { $limit: limit }      // Finalmente, limita el resultado al tamaño deseado
    ]).exec();
    console.log(randomRecipes)
    return randomRecipes;
  }
  async reviewRecipe(createReviewInput: CreateReviewInput) {

    const oldReview = await this.recipeReviewModel.findOne(
      {
        user_id: createReviewInput.user_id,
        recipe_id: createReviewInput.recipe_id
      }
    )
    if (oldReview) {
      throw new BadRequestException("ya calificaste esta receta")
    }

    await this.findById(createReviewInput.recipe_id)
    await this.usersService.findById(createReviewInput.user_id)
    const newReview = new this.recipeReviewModel(createReviewInput)
    console.log(newReview)
    return newReview.save()
  }

  async listRecipeByTag(tag: string) {
    try {
      const recipes = await this.recipeModel.aggregate(
        [
          {
            '$match': {
              'tags': tag
            }
          }
        ]
      )
      return recipes
    } catch (error) {
      throw new HttpException('Error server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async search(text: string) {
    try {

      if (!text) {
        return []
      }
      console.log(text)
      const arraytext: string[] = text.split(" ");
      const recipes = await this.recipeModel.aggregate([
        {
          '$match': {
            '$or': [
              { 'tags': { '$in': arraytext } },
              { 'title': { '$regex': text, '$options': 'i' } }, // Coincidencias parciales en el título
            ]
          }
        }
      ]);
      return recipes;
    } catch (error) {
      console.error("Error en la búsqueda:", error.message);
      throw new Error("No se pudo realizar la búsqueda");
    }
  }


}


