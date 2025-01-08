import { CreateRecipeInput } from './dto/create-recipe.input';
import { Recipe } from './entities/recipe.entity';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { PaginationDTO } from 'src/config/pagination.dto';
import { ReviewRecipe } from './entities/reviewRecipe.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { AwsBucketService } from 'src/aws-bucket/aws-bucket.service';
import { UpdateRecipeInput } from './dto/update-recipe.input';
export declare class RecipesService {
    private recipeModel;
    private recipeReviewModel;
    private readonly awsBucketService;
    private readonly usersService;
    constructor(recipeModel: Model<Recipe>, recipeReviewModel: Model<ReviewRecipe>, awsBucketService: AwsBucketService, usersService: UsersService);
    findById(_id: any): Promise<import("mongoose").Document<unknown, {}, Recipe> & Recipe & Required<{
        _id: Types.ObjectId;
    }>>;
    createRecipe(createRecipeInput: CreateRecipeInput): Promise<import("mongoose").Document<unknown, {}, Recipe> & Recipe & Required<{
        _id: Types.ObjectId;
    }>>;
    updateRecipe(updateRecipeInput: UpdateRecipeInput): Promise<import("mongoose").Document<unknown, {}, Recipe> & Recipe & Required<{
        _id: Types.ObjectId;
    }>>;
    addImgeToRecipe(_id: string, file: Express.Multer.File): Promise<any>;
    getRecipeById(_id: string): Promise<import("mongoose").Document<unknown, {}, Recipe> & Recipe & Required<{
        _id: Types.ObjectId;
    }>>;
    listMyRecipes(id: string, page?: number, perPage?: number): Promise<any[]>;
    listRecipeRandom(paginationDTO: PaginationDTO): Promise<any[]>;
    reviewRecipe(createReviewInput: CreateReviewInput): Promise<import("mongoose").Document<unknown, {}, ReviewRecipe> & ReviewRecipe & {
        _id: Types.ObjectId;
    }>;
    listRecipeByTag(tag: string): Promise<any[]>;
    search(text: string): Promise<any[]>;
    deleteRecipeById(_id: string): Promise<boolean>;
    approveRecipeById(_id: string): Promise<boolean>;
}
