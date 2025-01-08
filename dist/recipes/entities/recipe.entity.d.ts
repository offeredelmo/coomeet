import { HydratedDocument, Types } from 'mongoose';
export declare class Ingredient {
    name: string;
    quantity: number;
    unit: string;
}
export type IngredientDocument = HydratedDocument<Ingredient>;
export declare class Recipe {
    _id: Types.ObjectId;
    title: string;
    img_url?: string;
    key_img_url?: string;
    preparation: string[];
    ingredients: Ingredient[];
    ingredients_quantity: number;
    time_preparation_in_minutes: number;
    url_youtube: string;
    dificult: string;
    tags: string[];
    approved: boolean;
    delete: boolean;
    user_id: Types.ObjectId;
}
export type RecipeDocument = HydratedDocument<Recipe>;
export declare const RecipeSchema: import("mongoose").Schema<Recipe, import("mongoose").Model<Recipe, any, any, any, import("mongoose").Document<unknown, any, Recipe> & Recipe & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Recipe, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Recipe>> & import("mongoose").FlatRecord<Recipe> & Required<{
    _id: Types.ObjectId;
}>>;
export declare enum UnitOfMeasure {
    GRAMS = "gramo",
    KILOGRAMS = "kilos",
    CUPS = "taza",
    TABLESPOONS = "cucharada",
    TEASPOONS = "cucharadita",
    LITERS = "litro",
    MILLILITERS = "mililitro",
    PIECES = "pieza",
    TO_TASTE = "algusto",
    PINCH = "pisca",
    QUARTER = "cuarto",
    HALF = "mitad"
}
