import { CreateUserDto } from './dto/create-user.dto';
import { UpdateIngredientsDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: string;
    }>>;
    findByEmail(email: any): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: string;
    }>>;
    findById(_id: any): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: string;
    }>>;
    remove(_id: string): Promise<string>;
    listIngredients(_id: string): Promise<string[]>;
    updateIngredients(updateIngredientsDto: UpdateIngredientsDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: string;
    }>>;
    recoveryPassword(email: string, password: string, verificationCode: string): Promise<string>;
    addVerificationCode(code: string, email: string): Promise<void>;
    updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
}
