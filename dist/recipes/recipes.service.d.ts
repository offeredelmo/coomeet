import { CreateRecipeInput } from './dto/create-recipe.input';
import { ImagesService } from 'src/images/images.service';
import { Recipe } from './entities/recipe.entity';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { PaginationDTO } from 'src/config/pagination.dto';
import { ReviewRecipe } from './entities/reviewRecipe.entity';
import { CreateReviewInput } from './dto/create-review.input';
export declare class RecipesService {
    private recipeModel;
    private recipeReviewModel;
    private readonly imagesService;
    private readonly usersService;
    constructor(recipeModel: Model<Recipe>, recipeReviewModel: Model<ReviewRecipe>, imagesService: ImagesService, usersService: UsersService);
    findById(_id: any): Promise<import("mongoose").Document<unknown, {}, Recipe> & Recipe & Required<{
        _id: Types.ObjectId;
    }>>;
    createRecipe(createRecipeInput: CreateRecipeInput, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, Recipe> & Recipe & Required<{
        _id: Types.ObjectId;
    }>>;
    getRecipe(_id: string): Promise<import("mongoose").Document<unknown, {}, Recipe> & Recipe & Required<{
        _id: Types.ObjectId;
    }>>;
    listMyRecipes(id: string, page?: number, perPage?: number): Promise<any[]>;
    listRecipeRandom(paginationDTO: PaginationDTO): Promise<any[]>;
    reviewRecipe(createReviewInput: CreateReviewInput): Promise<import("mongoose").Document<unknown, {}, ReviewRecipe> & ReviewRecipe & {
        _id: Types.ObjectId;
    }>;
    validateRecipe(recipe: Recipe): Promise<void>;
}
