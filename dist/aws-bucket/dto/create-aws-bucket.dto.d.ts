export declare class CreateAwsBucketDto {
}
export declare class UploadFileDto {
    bucketName: string;
    key: string;
    body: any;
    constructor(bucketName: string, key: string, body: any);
}
