import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
