import { UploadFileDto } from './dto/create-aws-bucket.dto';
export declare class AwsBucketService {
    uploadImageAndReturnUrl(uploadFileDto: UploadFileDto): Promise<any>;
}
