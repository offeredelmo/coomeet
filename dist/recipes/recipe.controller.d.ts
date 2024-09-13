import { RecipesService } from "./recipes.service";
import { CreateRecipeInput } from "./dto/create-recipe.input";
import { PaginationDTO } from "src/config/pagination.dto";
import { CreateReviewInput } from "./dto/create-review.input";
export declare class RecipeController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(createRecipeInput: CreateRecipeInput, file?: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("./entities/recipe.entity").Recipe> & import("./entities/recipe.entity").Recipe & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getRecipe(id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/recipe.entity").Recipe> & import("./entities/recipe.entity").Recipe & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listMyRecipes(params: any): Promise<any[]>;
    listRecipeRandom(paginationDTO: PaginationDTO): Promise<any[]>;
    reviewRecipe(createReviewInput: CreateReviewInput): Promise<import("mongoose").Document<unknown, {}, import("./entities/reviewRecipe.entity").ReviewRecipe> & import("./entities/reviewRecipe.entity").ReviewRecipe & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
