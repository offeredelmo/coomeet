import { PartialType } from '@nestjs/mapped-types';
import { CreateAwsBucketDto, UploadFileDto } from './create-aws-bucket.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAwsBucketDto extends PartialType(CreateAwsBucketDto) {}

