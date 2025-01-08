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
exports.UnitOfMeasure = exports.RecipeSchema = exports.Recipe = exports.Ingredient = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Ingredient = class Ingredient {
};
exports.Ingredient = Ingredient;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], Ingredient.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Ingredient.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Ingredient.prototype, "unit", void 0);
exports.Ingredient = Ingredient = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)()
], Ingredient);
let Recipe = class Recipe {
};
exports.Recipe = Recipe;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Recipe.prototype, "img_url", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Recipe.prototype, "key_img_url", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Recipe.prototype, "preparation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: Ingredient }] }),
    __metadata("design:type", Array)
], Recipe.prototype, "ingredients", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Recipe.prototype, "ingredients_quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Recipe.prototype, "time_preparation_in_minutes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Recipe.prototype, "url_youtube", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Recipe.prototype, "dificult", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Recipe.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Recipe.prototype, "approved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Recipe.prototype, "delete", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Recipe.prototype, "user_id", void 0);
exports.Recipe = Recipe = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)({ timestamps: true })
], Recipe);
exports.RecipeSchema = mongoose_1.SchemaFactory.createForClass(Recipe);
var UnitOfMeasure;
(function (UnitOfMeasure) {
    UnitOfMeasure["GRAMS"] = "gramo";
    UnitOfMeasure["KILOGRAMS"] = "kilos";
    UnitOfMeasure["CUPS"] = "taza";
    UnitOfMeasure["TABLESPOONS"] = "cucharada";
    UnitOfMeasure["TEASPOONS"] = "cucharadita";
    UnitOfMeasure["LITERS"] = "litro";
    UnitOfMeasure["MILLILITERS"] = "mililitro";
    UnitOfMeasure["PIECES"] = "pieza";
    UnitOfMeasure["TO_TASTE"] = "algusto";
    UnitOfMeasure["PINCH"] = "pisca";
    UnitOfMeasure["QUARTER"] = "cuarto";
    UnitOfMeasure["HALF"] = "mitad";
})(UnitOfMeasure || (exports.UnitOfMeasure = UnitOfMeasure = {}));
(0, graphql_1.registerEnumType)(UnitOfMeasure, {
    name: 'UnitOfMeasure',
});
//# sourceMappingURL=recipe.entity.js.map