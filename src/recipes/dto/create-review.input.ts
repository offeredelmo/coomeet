import { Field, ID, InputType } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { Types } from "mongoose";


@InputType()
class Time {
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Field(() => Number, {nullable:true})
    hours: number

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Field(() => Number, {nullable:true})
    minutes: number
}


@InputType()
export class CreateReviewInput {
    @IsNotEmpty()
    @IsMongoId()
    @Field(() => ID, {nullable:false})
    user_id: Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    @Field(() => ID, {nullable:false})
    recipe_id: Types.ObjectId

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Field(() => Number, {nullable:false})
    starst: number

    @IsOptional()
    @Field(() => Time, {nullable:true})
    time: Time
  
}
