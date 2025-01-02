"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const auth_service_1 = require("./auth/auth.service");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const nodemailer_module_1 = require("./nodemailer/nodemailer.module");
const configuration_1 = require("./config/configuration");
const mailer_1 = require("@nestjs-modules/mailer");
const recipes_module_1 = require("./recipes/recipes.module");
const aws_bucket_module_1 = require("./aws-bucket/aws-bucket.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                envFilePath: '.env'
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    transport: {
                        host: configService.get('email_host'),
                        port: configService.get('email_port'),
                        secure: true,
                        auth: {
                            user: configService.get('auth_user'),
                            pass: configService.get('auth_pass'),
                        },
                    }
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('mongo_url_db'),
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            nodemailer_module_1.NodemailerModule,
            recipes_module_1.RecipesModule,
            aws_bucket_module_1.AwsBucketModule,
        ],
        controllers: [],
        providers: [auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map