import { InputType, Int, Field, Float, ID } from '@nestjs/graphql';
import { UnitOfMeasure } from '../entities/recipe.entity';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';


@InputType()
class IngredientInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @Field(() => Float)
  quantity: number;

  @IsEnum(UnitOfMeasure)
  @Field(() => UnitOfMeasure)
  unit: UnitOfMeasure;
}

@InputType()
export class CreateRecipeInput {

  @IsNotEmpty()
  @IsMongoId()
  @Field(() => ID, {nullable:false})
  user_id: Types.ObjectId

  @IsNotEmpty({message:"El titulo no debe de estar vacio"})
  @IsString({message: ""})
  @Field(() => String, { description: 'Title of the recipe',})
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: true, description: 'Preparation instructions' })
  preparation?: string;

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => IngredientInput)
  @Field(() => [IngredientInput], { description: 'List of ingredients for the recipe' })
  ingredients: IngredientInput[];

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
  @Field(() => [String], { description: 'tags' })
  tags: string[];

}
    
