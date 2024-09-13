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
    preparation?: string;
    ingredients: Ingredient[];
    user_id: Types.ObjectId;
    tags: string[];
}
export type RecipeDocument = HydratedDocument<Recipe>;
export declare const RecipeSchema: import("mongoose").Schema<Recipe, import("mongoose").Model<Recipe, any, any, any, import("mongoose").Document<unknown, any, Recipe> & Recipe & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Recipe, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Recipe>> & import("mongoose").FlatRecord<Recipe> & Required<{
    _id: Types.ObjectId;
}>>;
export declare enum UnitOfMeasure {
    GRAMS = "Gramos",
    KILOGRAMS = "Kilos",
    CUPS = "Tazas",
    TABLESPOONS = "Cucharadas",
    TEASPOONS = "Cucharaditas",
    LITERS = "Litros",
    MILLILITERS = "Mililitros",
    UNITS = "Unidades",
    PIECES = "Piezas",
    TO_TASTE = "Al gusto"
}
