import { Controller, Body,  Post, UseInterceptors, UploadedFile, Get, Param } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateRecipeInput } from "./dto/create-recipe.input";
import { PaginationDTO } from "src/config/pagination.dto";
import { CreateReviewInput } from "./dto/create-review.input";



@Controller("recipe")
export class RecipeController {
    constructor(
        private readonly recipesService: RecipesService,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createRecipe(
        @Body() createRecipeInput:CreateRecipeInput,
        @UploadedFile() file?: Express.Multer.File
    ){
        return await this.recipesService.createRecipe(createRecipeInput, file)
    }

    @Get("info/:id")
    async getRecipe(@Param("id") id:string) {
        return await this.recipesService.getRecipe(id)
    }

    @Get("my-recipes/:id/:page/:perpage")
    async listMyRecipes(@Param() params:any) {
        console.log(params)
        return await this.recipesService.listMyRecipes(params.id, params.page, params.page)
    }


    @Get("/random")
    async listRecipeRandom(@Body() paginationDTO:PaginationDTO){
        return await this.recipesService.listRecipeRandom(paginationDTO)
    }

    @Post("review")
    async reviewRecipe(@Body()  createReviewInput:CreateReviewInput) {
        return await this.recipesService.reviewRecipe(createReviewInput)
    }
}