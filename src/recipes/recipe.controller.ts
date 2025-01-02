import { Controller, Body, Post, UseInterceptors, UploadedFile, Get, Param, Query, Patch } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateRecipeInput } from "./dto/create-recipe.input";
import { PaginationDTO } from "src/config/pagination.dto";
import { CreateReviewInput } from "./dto/create-review.input";
import { UpdateRecipeInput } from "./dto/update-recipe.input";



@Controller("recipe")
export class RecipeController {
    constructor(
        private readonly recipesService: RecipesService,
    ) { }

    @Post("/add")
    async createRecipe(
        @Body() createRecipeInput: CreateRecipeInput,
    ) {
        console.log("entre en el metodo")
        return await this.recipesService.createRecipe(createRecipeInput)
    }

    @Patch("/update")
    async updateRecipe(
        @Body() updateRecipeInput: UpdateRecipeInput,
    ) {
        return await this.recipesService.updateRecipe(updateRecipeInput)
    }


    @Post("/add-photo")
    @UseInterceptors(FileInterceptor('file'))
    async addImgeToImage(
        @Body("_id") _id: string,
        @UploadedFile() file?: Express.Multer.File
    ) {
        console.log("entrooo")
        return await this.recipesService.addImgeToImage(_id, file)
    }


    @Get("recipe/:id")
    async getRecipe(@Param("id") id: string) {
        return await this.recipesService.getRecipe(id)
    }

    @Get("my-recipes/:id/:page/:perpage")
    async listMyRecipes(@Param() params: any) {
        console.log(params)
        return await this.recipesService.listMyRecipes(params.id, params.page, params.page)
    }

    @Get("/search/")
    async search(
        @Body("text") text: string
    ) {
        return await this.recipesService.search(text)
    }


    @Get("/random")
    async listRecipeRandom(@Body() paginationDTO: PaginationDTO) {
        return await this.recipesService.listRecipeRandom(paginationDTO)
    }

    @Get("/tag/")
    async listRecipeByTag(
        @Query("tag") tag: string
    ) {
        return await this.recipesService.listRecipeByTag(tag)
    }


    @Post("review")
    async reviewRecipe(@Body() createReviewInput: CreateReviewInput) {
        return await this.recipesService.reviewRecipe(createReviewInput)
    }
}