import { Types } from 'mongoose';
import { CreateRecipeInput } from './create-recipe.input';
declare const UpdateRecipeInput_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRecipeInput>>;
export declare class UpdateRecipeInput extends UpdateRecipeInput_base {
    _id: Types.ObjectId;
}
export {};
