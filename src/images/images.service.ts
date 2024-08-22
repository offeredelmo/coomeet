import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import { ConfigService } from '@nestjs/config';



@Injectable()
export class ImagesService {

  private s3:AWS.S3

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      endpoint: this.configService.get<string>('endpoint_dc'), 
      accessKeyId: this.configService.get<string>('access_key_dc'),
      secretAccessKey: this.configService.get<string>('secret_access_key_dc'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: this.configService.get<string>("name_bucket"),
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
    };

    const result = await this.s3.upload(params).promise();
    return result.Location;
  }


  async updateImage(img_url: string, newFile: Express.Multer.File): Promise<string> {
    let key: string;

    if (img_url) {
      key = this.getKeyFromUrl(img_url);
    } else {
      const fileExtension = this.getFileExtension(newFile.originalname);
      key = `${uuidv4()}-${fileExtension}`;
    }

    const newImageUrl = await this.uploadFileWithKey(newFile, key);

    return newImageUrl;
  }

  private async uploadFileWithKey(file: Express.Multer.File, key: string): Promise<string> {
    const params = {
      Bucket: this.configService.get<string>("name_bucket"),
      Key: key,
      Body: file.buffer,
      ACL: 'public-read',
    };
    const result = await this.s3.upload(params).promise();
    return result.Location;
  }

  private getKeyFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }

  private getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 1);
  }
}
