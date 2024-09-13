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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
let ImagesService = class ImagesService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = new AWS.S3({
            endpoint: this.configService.get('endpoint_dc'),
            accessKeyId: this.configService.get('access_key_dc'),
            secretAccessKey: this.configService.get('secret_access_key_dc'),
        });
    }
    async uploadFile(file) {
        const params = {
            Bucket: this.configService.get("name_bucket"),
            Key: `${(0, uuid_1.v4)()}-${file.originalname}`,
            Body: file.buffer,
            ACL: 'public-read',
        };
        const result = await this.s3.upload(params).promise();
        return result.Location;
    }
    async updateImage(img_url, newFile) {
        let key;
        if (img_url) {
            key = this.getKeyFromUrl(img_url);
        }
        else {
            const fileExtension = this.getFileExtension(newFile.originalname);
            key = `${(0, uuid_1.v4)()}-${fileExtension}`;
        }
        const newImageUrl = await this.uploadFileWithKey(newFile, key);
        return newImageUrl;
    }
    async uploadFileWithKey(file, key) {
        const params = {
            Bucket: this.configService.get("name_bucket"),
            Key: key,
            Body: file.buffer,
            ACL: 'public-read',
        };
        const result = await this.s3.upload(params).promise();
        return result.Location;
    }
    getKeyFromUrl(url) {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1];
    }
    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 1);
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ImagesService);
//# sourceMappingURL=images.service.js.map