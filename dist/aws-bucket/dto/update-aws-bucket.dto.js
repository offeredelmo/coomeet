"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAwsBucketDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_aws_bucket_dto_1 = require("./create-aws-bucket.dto");
class UpdateAwsBucketDto extends (0, mapped_types_1.PartialType)(create_aws_bucket_dto_1.CreateAwsBucketDto) {
}
exports.UpdateAwsBucketDto = UpdateAwsBucketDto;
//# sourceMappingURL=update-aws-bucket.dto.js.map