import { ObjectType, Field, Int, Float, ID, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Stream } from 'stream';


@ObjectType()
@Schema()
export class Ingredient {

  @Prop({required:true})
  @Field(() => String, {nullable: false})
  name: string;

  @Prop()
  @Field(() => Float)
  quantity: number;

  @Prop()
  @Field()
  unit: string;
}


export type IngredientDocument = HydratedDocument<Ingredient>;



@ObjectType()
@Schema()
export class Recipe {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Prop({required: true})
  @Field(() => String, {nullable: false, description: 'title recipe' })
  title: string;

  @Prop()
  @Field(() => String, {nullable: true, description: 'url image'})
  img_url?: string;

  @Prop()
  @Field(() => String, {nullable: true, description: 'preparation instructions'})
  preparation?: string;

  @Prop({ type: [{ type: Ingredient }] })
  @Field(() => [Ingredient], {nullable: 'itemsAndList', description:'ingredients for recipe'})
  ingredients: Ingredient[];

  @Prop()
  @Field(() => ID)
  user_id: Types.ObjectId

  @Prop()
  @Field(() => [String], {nullable:true})
  tags: string[]

}

export type RecipeDocument = HydratedDocument<Recipe>;
export const RecipeSchema = SchemaFactory.createForClass(Recipe);


export enum UnitOfMeasure {
  GRAMS = 'gramos',
  KILOGRAMS = 'kilos',
  CUPS = 'tazas',
  TABLESPOONS = 'cucharadas',
  TEASPOONS = 'cucharaditas',
  LITERS = 'litros',
  MILLILITERS = 'mililitros',
  UNITS = 'unidades',
  PIECES = 'piezas'
}

registerEnumType(UnitOfMeasure, {
  name: 'UnitOfMeasure', // Este es el nombre que se usará en el schema GraphQL
});