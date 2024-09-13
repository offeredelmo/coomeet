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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const nodemailer_service_1 = require("../nodemailer/nodemailer.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, nodemailerService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.nodemailerService = nodemailerService;
        this.configService = configService;
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        const comparePassword = await bcrypt.compare(loginDto.password, user.password);
        if (comparePassword) {
            const tokens = await this.getTokens(user._id, user.email, user.roles);
            await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
            return {
                name: (user.userName),
                email: user.email,
                role: user.roles,
                id: user.id,
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken
            };
        }
        else {
            throw new common_1.UnauthorizedException(`contraseña no valida`);
        }
    }
    async register(registerDto) {
        return await this.usersService.create(registerDto);
    }
    async sendRecoveryCodeEmail(email) {
        await this.usersService.findByEmail(email);
        const code = (0, crypto_1.randomBytes)(7).toString('hex').substring(0, 7);
        const responseEmail = await this.nodemailerService.sendEmailByRecoverypassword(code, email);
        this.usersService.addVerificationCode(code, email);
        return responseEmail;
    }
    async recoveryPassword(email, password, verificationCode) {
        return await this.usersService.recoveryPassword(email, password, verificationCode);
    }
    async getTokens(userId, email, roles) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                user: userId,
                sub: email,
                roles,
            }, {
                secret: this.configService.get('access_token'),
                expiresIn: '24h',
            }),
            this.jwtService.signAsync({
                user: userId,
                sub: email,
                roles,
            }, {
                secret: this.configService.get('refresh_token'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access Denied');
        const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user._id, user.id, user.roles);
        await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        nodemailer_service_1.NodemailerService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map