import { HydratedDocument } from "mongoose";
import { UserRole } from "../enums/rol.enum";
export declare class User {
    _id: string;
    userName: string;
    email: string;
    password: string;
    ingredients: string[];
    allergies: string[];
    roles: UserRole[];
    verificationCode: string;
    verificationCodeExpires: Date;
    refreshToken: string;
    delete: boolean;
    deletedAt?: Date;
}
export type UserDocument = HydratedDocument<User>;
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: string;
}>>;
