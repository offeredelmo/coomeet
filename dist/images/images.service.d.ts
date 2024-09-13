import { ConfigService } from '@nestjs/config';
export declare class ImagesService {
    private readonly configService;
    private s3;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<string>;
    updateImage(img_url: string, newFile: Express.Multer.File): Promise<string>;
    private uploadFileWithKey;
    private getKeyFromUrl;
    private getFileExtension;
}
