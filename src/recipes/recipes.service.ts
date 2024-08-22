import { Injectable } from '@nestjs/common';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { ImagesService } from 'src/images/images.service';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './entities/recipe.entity';
import { Model } from 'mongoose';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    private readonly imagesService: ImagesService
  ) { }

  async createRecipe(createRecipeInput: CreateRecipeInput, file: Express.Multer.File) {
    const newRecipe = new this.recipeModel(createRecipeInput)
    if (file) {
      const img_url =  await this.imagesService.uploadFile(file)
      newRecipe.img_url = img_url
    }
    return await newRecipe.save()
  }

  async listRecipeRandom(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const randomRecipes = await this.recipeModel.aggregate([
      { $sample: { size: 100 } }, // Primero, selecciona 100 recetas aleatorias
      { $skip: skip },            // Luego, salta las necesarias según la página
      { $limit: limit }           // Finalmente, limita el resultado al tamaño deseado
    ]).exec();
    console.log(randomRecipes)
    return randomRecipes;
  }

}
