import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";


@ObjectType()
@Schema()
export class Time {
  @Prop()
  hours: number;

  @Prop()
  minutes: number;
}


export type IngredientDocument = HydratedDocument<Time>;


@ObjectType()
@Schema()
export class ReviewRecipe {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', index:true,})
  user_id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Recipe', index:true})
  recipe_id: mongoose.Types.ObjectId;

  @Prop()
  time: Time
}


export type ReviewRecipeDocument = HydratedDocument<ReviewRecipe>;
export const ReviewRecipeSchema = SchemaFactory.createForClass(ReviewRecipe);
