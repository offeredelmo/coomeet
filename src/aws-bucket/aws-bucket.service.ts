import { Injectable } from '@nestjs/common';
const AWS = require('aws-sdk');
import { UploadFileDto } from './dto/create-aws-bucket.dto';
var s3 = new AWS.S3;


@Injectable()
export class AwsBucketService {
  async uploadImageAndReturnUrl(uploadFileDto: UploadFileDto) {
    const params = {
      Bucket: uploadFileDto.bucketName, // Nombre del bucket
      Key: uploadFileDto.key,           // Nombre del archivo
      Body: uploadFileDto.body,         // Contenido del archivo
    };

    try {
      const result = await s3.upload(params).promise();
      console.log(result)
      return result; // Retorna la URL del archivo subido
    } catch (error) {
      console.error('Error al subir el archivo a S3:', error);
      throw new Error('No se pudo subir el archivo a S3');
    }
  }

}
