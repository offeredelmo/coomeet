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
exports.CreateRecipeInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const recipe_entity_1 = require("../entities/recipe.entity");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("mongoose");
let IngredientInput = class IngredientInput {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IngredientInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], IngredientInput.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(recipe_entity_1.UnitOfMeasure),
    __metadata("design:type", String)
], IngredientInput.prototype, "unit", void 0);
IngredientInput = __decorate([
    (0, graphql_1.InputType)()
], IngredientInput);
let CreateRecipeInput = class CreateRecipeInput {
};
exports.CreateRecipeInput = CreateRecipeInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateRecipeInput.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El titulo no debe de estar vacio" }),
    (0, class_validator_1.IsString)({ message: "" }),
    __metadata("design:type", String)
], CreateRecipeInput.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateRecipeInput.prototype, "preparation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => IngredientInput),
    __metadata("design:type", Array)
], CreateRecipeInput.prototype, "ingredients", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecipeInput.prototype, "url_youtube", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch {
                return value.split(',').map(item => item.trim());
            }
        }
        return value;
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateRecipeInput.prototype, "tags", void 0);
exports.CreateRecipeInput = CreateRecipeInput = __decorate([
    (0, graphql_1.InputType)()
], CreateRecipeInput);
//# sourceMappingURL=create-recipe.input.js.map