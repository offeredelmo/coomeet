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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
const platform_express_1 = require("@nestjs/platform-express");
const create_recipe_input_1 = require("./dto/create-recipe.input");
const pagination_dto_1 = require("../config/pagination.dto");
const create_review_input_1 = require("./dto/create-review.input");
const update_recipe_input_1 = require("./dto/update-recipe.input");
let RecipeController = class RecipeController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async createRecipe(createRecipeInput) {
        console.log("entre en el metodo");
        return await this.recipesService.createRecipe(createRecipeInput);
    }
    async updateRecipe(updateRecipeInput) {
        return await this.recipesService.updateRecipe(updateRecipeInput);
    }
    async addImgeToImage(_id, file) {
        console.log("entrooo");
        return await this.recipesService.addImgeToImage(_id, file);
    }
    async getRecipe(id) {
        return await this.recipesService.getRecipe(id);
    }
    async listMyRecipes(params) {
        console.log(params);
        return await this.recipesService.listMyRecipes(params.id, params.page, params.page);
    }
    async search(text) {
        return await this.recipesService.search(text);
    }
    async listRecipeRandom(paginationDTO) {
        return await this.recipesService.listRecipeRandom(paginationDTO);
    }
    async listRecipeByTag(tag) {
        return await this.recipesService.listRecipeByTag(tag);
    }
    async reviewRecipe(createReviewInput) {
        return await this.recipesService.reviewRecipe(createReviewInput);
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, common_1.Post)("/add"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_input_1.CreateRecipeInput]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "createRecipe", null);
__decorate([
    (0, common_1.Patch)("/update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_recipe_input_1.UpdateRecipeInput]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "updateRecipe", null);
__decorate([
    (0, common_1.Post)("/add-photo"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)("_id")),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "addImgeToImage", null);
__decorate([
    (0, common_1.Get)("recipe/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipe", null);
__decorate([
    (0, common_1.Get)("my-recipes/:id/:page/:perpage"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "listMyRecipes", null);
__decorate([
    (0, common_1.Get)("/search/"),
    __param(0, (0, common_1.Body)("text")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "search", null);
__decorate([
    (0, common_1.Get)("/random"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDTO]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "listRecipeRandom", null);
__decorate([
    (0, common_1.Get)("/tag/"),
    __param(0, (0, common_1.Query)("tag")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "listRecipeByTag", null);
__decorate([
    (0, common_1.Post)("review"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_input_1.CreateReviewInput]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "reviewRecipe", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)("recipe"),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map