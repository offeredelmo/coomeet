"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const rol_enum_1 = require("./enums/rol.enum");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        try {
            const newUser = new this.userModel(createUserDto);
            newUser.password = await bcrypt.hash(createUserDto.password, 10);
            newUser.roles.push(rol_enum_1.UserRole.USER);
            await newUser.save();
            return newUser;
        }
        catch (error) {
            if (error.code == 11000) {
                throw new common_1.BadRequestException(`El correo ${createUserDto.email} ya esta registrado`);
            }
            console.log(error);
            throw new common_1.InternalServerErrorException("a ocurrido un error inesperado, intente mas tarde");
        }
    }
    async findByEmail(email) {
        const userSerch = await this.userModel.findOne({ email: email });
        if (!userSerch) {
            throw new common_1.UnauthorizedException(`el usuario con el email ${email} no fue encontrado`);
        }
        return userSerch;
    }
    async findById(_id) {
        const userSerch = await this.userModel.findById(_id);
        if (!userSerch) {
            throw new common_1.NotFoundException(`el usuario con el id ${_id} no fue encontrado`);
        }
        return userSerch;
    }
    async remove(_id) {
        const removeUser = await this.userModel.findOneAndUpdate({ _id }, { $set: { delete: true } }, { new: true });
        if (!removeUser) {
            throw new common_1.NotFoundException(`el usuario con el id ${_id} no fue encontrado`);
        }
        return `el usuario con el id ${_id} no fue encontrado`;
    }
    async listIngredients(_id) {
        console.log(_id);
        const user = await this.findById(_id);
        return user.ingredients;
    }
    async updateIngredients(updateIngredientsDto) {
        const user = await this.userModel.findById(updateIngredientsDto.user_id);
        user.ingredients = updateIngredientsDto.ingredients;
        return await user.save();
    }
    async recoveryPassword(email, password, verificationCode) {
        const user = await this.findByEmail(email);
        if (verificationCode === user.verificationCode) {
            if (user.verificationCodeExpires > new Date()) {
                try {
                    user.password = await bcrypt.hash(password, 10);
                    user.verificationCode = null;
                    user.verificationCodeExpires = null;
                    user.save();
                    return "contraseña cambiada";
                }
                catch (error) {
                    throw new common_1.ServiceUnavailableException("a ocurrido un error intestelo mas tarde o reportelo a soporte");
                }
            }
            else {
                console.log(verificationCode, ":", user.verificationCode);
                throw new common_1.UnauthorizedException("el codigo a expirado solicita uno nuevo");
            }
        }
        else {
            throw new common_1.UnauthorizedException("el codigo no es valido");
        }
    }
    async addVerificationCode(code, email) {
        const expires = new Date(Date.now() + 5 * 60 * 1000);
        await this.userModel.updateOne({ email }, {
            verificationCode: code,
            verificationCodeExpires: expires,
        });
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userModel.findByIdAndUpdate({ _id: userId }, { refreshToken: hashedRefreshToken }, { new: true });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map