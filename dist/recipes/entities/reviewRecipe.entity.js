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
exports.ReviewRecipeSchema = exports.ReviewRecipe = exports.Time = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Time = class Time {
};
exports.Time = Time;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Time.prototype, "hours", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Time.prototype, "minutes", void 0);
exports.Time = Time = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)()
], Time);
let ReviewRecipe = class ReviewRecipe {
};
exports.ReviewRecipe = ReviewRecipe;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: 'User', index: true, }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], ReviewRecipe.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: 'Recipe', index: true }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], ReviewRecipe.prototype, "recipe_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Time)
], ReviewRecipe.prototype, "time", void 0);
exports.ReviewRecipe = ReviewRecipe = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)()
], ReviewRecipe);
exports.ReviewRecipeSchema = mongoose_1.SchemaFactory.createForClass(ReviewRecipe);
//# sourceMappingURL=reviewRecipe.entity.js.map