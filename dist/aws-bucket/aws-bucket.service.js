"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsBucketService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require('aws-sdk');
var s3 = new AWS.S3;
let AwsBucketService = class AwsBucketService {
    async uploadImageAndReturnUrl(uploadFileDto) {
        const params = {
            Bucket: uploadFileDto.bucketName,
            Key: uploadFileDto.key,
            Body: uploadFileDto.body,
        };
        try {
            const result = await s3.upload(params).promise();
            console.log(result);
            return result;
        }
        catch (error) {
            console.error('Error al subir el archivo a S3:', error);
            throw new Error('No se pudo subir el archivo a S3');
        }
    }
};
exports.AwsBucketService = AwsBucketService;
exports.AwsBucketService = AwsBucketService = __decorate([
    (0, common_1.Injectable)()
], AwsBucketService);
//# sourceMappingURL=aws-bucket.service.js.map