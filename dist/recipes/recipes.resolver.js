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
exports.RecipesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const recipes_service_1 = require("./recipes.service");
const recipe_entity_1 = require("./entities/recipe.entity");
const create_recipe_input_1 = require("./dto/create-recipe.input");
let RecipesResolver = class RecipesResolver {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async createRecipe(createRecipeInput) {
        return "Hola mundo";
    }
    async findAll() {
        return "Hola mundo";
    }
};
exports.RecipesResolver = RecipesResolver;
__decorate([
    (0, graphql_1.Mutation)(() => recipe_entity_1.Recipe),
    __param(0, (0, graphql_1.Args)('createRecipeInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_input_1.CreateRecipeInput]),
    __metadata("design:returntype", Promise)
], RecipesResolver.prototype, "createRecipe", null);
__decorate([
    (0, graphql_1.Query)(() => [recipe_entity_1.Recipe], { name: 'recipes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipesResolver.prototype, "findAll", null);
exports.RecipesResolver = RecipesResolver = __decorate([
    (0, graphql_1.Resolver)(() => recipe_entity_1.Recipe),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesResolver);
//# sourceMappingURL=recipes.resolver.js.map