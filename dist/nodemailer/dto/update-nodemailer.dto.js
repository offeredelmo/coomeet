"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNodemailerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_nodemailer_dto_1 = require("./create-nodemailer.dto");
class UpdateNodemailerDto extends (0, mapped_types_1.PartialType)(create_nodemailer_dto_1.CreateNodemailerDto) {
}
exports.UpdateNodemailerDto = UpdateNodemailerDto;
//# sourceMappingURL=update-nodemailer.dto.js.map