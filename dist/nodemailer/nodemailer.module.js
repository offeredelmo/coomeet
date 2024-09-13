"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerModule = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_service_1 = require("./nodemailer.service");
const nodemailer_controller_1 = require("./nodemailer.controller");
let NodemailerModule = class NodemailerModule {
};
exports.NodemailerModule = NodemailerModule;
exports.NodemailerModule = NodemailerModule = __decorate([
    (0, common_1.Module)({
        exports: [nodemailer_service_1.NodemailerService],
        controllers: [nodemailer_controller_1.NodemailerController],
        providers: [nodemailer_service_1.NodemailerService],
    })
], NodemailerModule);
//# sourceMappingURL=nodemailer.module.js.map