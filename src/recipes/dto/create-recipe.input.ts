import { InputType, Int, Field, Float, ID } from '@nestjs/graphql';
import { UnitOfMeasure } from '../entities/recipe.entity';
import { IsArray, IsEnum, IsMongoId, isNotEmpty, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';


@InputType()
class IngredientInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  quantity: number;

  @IsEnum(UnitOfMeasure)
  unit: UnitOfMeasure;
}

@InputType()
export class
  CreateRecipeInput {

  @IsNotEmpty()
  @IsMongoId()
  user_id: Types.ObjectId

  @IsNotEmpty({ message: "El titulo no debe de estar vacio" })
  @IsString({ message: "" })
  title: string;

  @IsNotEmpty()
  @IsArray()
  preparation?: string[];

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => IngredientInput)
  ingredients: IngredientInput[];
  
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  url_youtube: string

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(',').map(item => item.trim());
      }
    }
    return value;
  })
  @IsOptional()
  tags: string[];

}

