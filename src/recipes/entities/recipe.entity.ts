import { ObjectType, Field, Int, Float, ID, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


@ObjectType()
@Schema()
export class Ingredient {

  @Prop({ required: true })
  @Field(() => String, { nullable: false })
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
@Schema({ timestamps: true })
export class Recipe {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  img_url?: string;

  @Prop()
  key_img_url?: string;

  @Prop()
  preparation: string[];

  @Prop({ type: [{ type: Ingredient }] })
  ingredients: Ingredient[];

  @Prop()
  url_youtube: string

  @Prop({ index: true, ref: "User" })
  user_id: Types.ObjectId

  @Prop()
  tags: string[]

  @Prop({default:false})
  approved: boolean

  @Prop({default:false})
  delete: boolean
}

export type RecipeDocument = HydratedDocument<Recipe>;
export const RecipeSchema = SchemaFactory.createForClass(Recipe);


export enum UnitOfMeasure {
  GRAMS = 'gramo',
  KILOGRAMS = 'kilos',
  CUPS = 'taza',
  TABLESPOONS = 'cucharada',
  TEASPOONS = 'cucharadita',
  LITERS = 'litro',
  MILLILITERS = 'mililitro',
  PIECES = 'pieza',
  TO_TASTE = 'algusto',
  PINCH = 'pisca',
  QUARTER = 'cuarto',
  HALF = 'mitad',
}


registerEnumType(UnitOfMeasure, {
  name: 'UnitOfMeasure', // Este es el nombre que se usará en el schema GraphQL
});