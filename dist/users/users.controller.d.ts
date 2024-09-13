import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateIngredientsDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & import("./entities/user.entity").User & Required<{
        _id: string;
    }>>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & import("./entities/user.entity").User & Required<{
        _id: string;
    }>>;
    remove(id: string): Promise<string>;
    listIngredients(user_id: string): Promise<string[]>;
    updateIngredients(updateIngredientsDto: UpdateIngredientsDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & import("./entities/user.entity").User & Required<{
        _id: string;
    }>>;
}
