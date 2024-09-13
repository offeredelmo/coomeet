import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { ImagesService } from 'src/images/images.service';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient, Recipe } from './entities/recipe.entity';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { PaginationDTO } from 'src/config/pagination.dto';
import { NotFoundError } from 'rxjs';
import { ReviewRecipe } from './entities/reviewRecipe.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { forbiddenWords } from 'src/utils/forbidenWords';


@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(ReviewRecipe.name) private recipeReviewModel: Model<ReviewRecipe>,
    private readonly imagesService: ImagesService,
    private readonly usersService: UsersService

  ) { }

  async findById(_id) {
    const recipe = this.recipeModel.findById(_id)
    if (!recipe) {
      throw new NotFoundException("no se a encontrado la receta")
    }
    return recipe
  }

  async createRecipe(createRecipeInput: CreateRecipeInput, file: Express.Multer.File) {

    const newRecipe = new this.recipeModel(createRecipeInput)

    await this.usersService.findById(createRecipeInput.user_id)

    if (file) {
      const img_url = await this.imagesService.uploadFile(file)
      newRecipe.img_url = img_url
    }

    console.log(newRecipe.save)
    return await newRecipe.save()
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
      throw new NotFoundError("No se a encontrado la receta")
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
  async validateRecipe(recipe: Recipe) {

      const words = recipe.preparation.toLowerCase().split(/\s+/);
      const wordsforbiden = words.some(word => forbiddenWords.has(word));
      console.log(wordsforbiden)


   

  }

}
