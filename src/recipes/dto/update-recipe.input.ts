import { Types } from 'mongoose';
import { CreateRecipeInput } from './create-recipe.input';
import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRecipeInput extends PartialType(CreateRecipeInput) {
  @IsNotEmpty()
  _id: Types.ObjectId;
}
