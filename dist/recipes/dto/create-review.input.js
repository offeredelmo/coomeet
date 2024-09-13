"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReviewInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
let Time = class Time {
};
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], Time.prototype, "hours", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], Time.prototype, "minutes", void 0);
Time = __decorate([
    (0, graphql_1.InputType)()
], Time);
let CreateReviewInput = class CreateReviewInput {
};
exports.CreateReviewInput = CreateReviewInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: false }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateReviewInput.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: false }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateReviewInput.prototype, "recipe_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, graphql_1.Field)(() => Number, { nullable: false }),
    __metadata("design:type", Number)
], CreateReviewInput.prototype, "starst", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => Time, { nullable: true }),
    __metadata("design:type", Time)
], CreateReviewInput.prototype, "time", void 0);
exports.CreateReviewInput = CreateReviewInput = __decorate([
    (0, graphql_1.InputType)()
], CreateReviewInput);
//# sourceMappingURL=create-review.input.js.map