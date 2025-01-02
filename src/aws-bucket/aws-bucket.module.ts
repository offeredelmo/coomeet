import { Module } from '@nestjs/common';
import { AwsBucketService } from './aws-bucket.service';

@Module({
  controllers: [],
  providers: [AwsBucketService],
  exports: [AwsBucketService]
})
export class AwsBucketModule {}
