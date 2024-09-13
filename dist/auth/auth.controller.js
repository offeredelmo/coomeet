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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const roles_decorator_1 = require("./decorators/roles.decorator");
const roles_guard_1 = require("./guard/roles.guard");
const rol_enum_1 = require("../users/enums/rol.enum");
const accessToken_guard_1 = require("./guard/accessToken.guard");
const refreshToken_guard_1 = require("./guard/refreshToken.guard");
const email_validation_pipe_1 = require("./pipes/email_validation.pipe");
const recoveryPassword_dto_1 = require("./dto/recoveryPassword.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return await this.authService.login(loginDto);
    }
    async register(registerDto) {
        console.log();
        return await this.authService.register(registerDto);
    }
    async sendRecoveryCodeEmail(email) {
        return this.authService.sendRecoveryCodeEmail(email);
    }
    async recoveryPasswordByEmail(recoveryPasswordDto) {
        const { email, password, verificationCode } = recoveryPasswordDto;
        return await this.authService.recoveryPassword(email, password, verificationCode);
    }
    refreshTokens(req) {
        const userId = req['user'].dataToken.user;
        const refreshToken = req['user'].refreshtoken;
        return this.authService.refreshTokens(userId, refreshToken);
    }
    async test() {
        return "test";
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("email-recovery-password"),
    __param(0, (0, common_1.Body)('email', email_validation_pipe_1.EmailValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendRecoveryCodeEmail", null);
__decorate([
    (0, common_1.Post)("recovery_password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recoveryPassword_dto_1.RecoveryPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "recoveryPasswordByEmail", null);
__decorate([
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(rol_enum_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "test", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map