import { UnitOfMeasure } from '../entities/recipe.entity';
import { Types } from 'mongoose';
declare class IngredientInput {
    name: string;
    quantity: number;
    unit: UnitOfMeasure;
}
export declare class CreateRecipeInput {
    user_id: Types.ObjectId;
    title: string;
    preparation?: string[];
    ingredients: IngredientInput[];
    url_youtube: string;
    tags: string[];
}
export {};
