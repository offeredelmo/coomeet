import { CreateUserDto } from './create-user.dto';
import { Types } from 'mongoose';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class UpdateIngredientsDto {
    user_id: Types.ObjectId;
    ingredients: string[];
}
export {};
