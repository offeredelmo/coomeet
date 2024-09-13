"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesModule = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
const recipes_resolver_1 = require("./recipes.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const recipe_entity_1 = require("./entities/recipe.entity");
const images_module_1 = require("../images/images.module");
const recipe_controller_1 = require("./recipe.controller");
const users_module_1 = require("../users/users.module");
const reviewRecipe_entity_1 = require("./entities/reviewRecipe.entity");
let RecipesModule = class RecipesModule {
};
exports.RecipesModule = RecipesModule;
exports.RecipesModule = RecipesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: recipe_entity_1.Recipe.name, schema: recipe_entity_1.RecipeSchema },
                { name: reviewRecipe_entity_1.ReviewRecipe.name, schema: reviewRecipe_entity_1.ReviewRecipeSchema }
            ]),
            images_module_1.ImagesModule,
            users_module_1.UsersModule
        ],
        controllers: [recipe_controller_1.RecipeController],
        providers: [recipes_resolver_1.RecipesResolver, recipes_service_1.RecipesService],
    })
], RecipesModule);
//# sourceMappingURL=recipes.module.js.map