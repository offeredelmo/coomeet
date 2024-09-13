import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

export class UpdateUserDto extends PartialType(CreateUserDto) { }



export class UpdateIngredientsDto {
    
    @IsNotEmpty()
    @IsMongoId()
    @Field(() => ID, { nullable: false })
    user_id: Types.ObjectId

    @IsOptional()
    @IsArray()
    ingredients: string[]
}