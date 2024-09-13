import mongoose, { HydratedDocument } from "mongoose";
export declare class Time {
    hours: number;
    minutes: number;
}
export type IngredientDocument = HydratedDocument<Time>;
export declare class ReviewRecipe {
    user_id: mongoose.Types.ObjectId;
    recipe_id: mongoose.Types.ObjectId;
    time: Time;
}
export type ReviewRecipeDocument = HydratedDocument<ReviewRecipe>;
export declare const ReviewRecipeSchema: mongoose.Schema<ReviewRecipe, mongoose.Model<ReviewRecipe, any, any, any, mongoose.Document<unknown, any, ReviewRecipe> & ReviewRecipe & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ReviewRecipe, mongoose.Document<unknown, {}, mongoose.FlatRecord<ReviewRecipe>> & mongoose.FlatRecord<ReviewRecipe> & {
    _id: Types.ObjectId;
}>;
