import { Controller, Body,  Post, UseInterceptors, UploadedFile, Get } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateRecipeInput } from "./dto/create-recipe.input";



@Controller("recipe")
export class RecipeController {
    constructor(private readonly recipesService: RecipesService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createRecipe(
        @Body() createRecipeInput:CreateRecipeInput,
        @UploadedFile() file: Express.Multer.File
    ){
        return await this.recipesService.createRecipe(createRecipeInput, file)
    }


    @Get()
    async listRecipeRandom(){
        return await this.listRecipeRandom()
    }
}