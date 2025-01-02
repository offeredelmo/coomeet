import { IsNotEmpty, IsString } from "class-validator";

export class CreateAwsBucketDto {}


export class UploadFileDto {
    @IsNotEmpty()
    @IsString()
    bucketName: string; // Nombre del bucket
    @IsNotEmpty()
    @IsString()
    key: string;        // Nombre del archivo
    @IsNotEmpty()
    body: any;          // Contenido del archivo (Buffer, Stream, etc.)

    constructor(
      bucketName: string,
      key: string,
      body: any
    ){
      this.bucketName = bucketName;
      this.key = key;
      this.body = body;
    }
  }
  