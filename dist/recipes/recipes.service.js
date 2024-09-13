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
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const images_service_1 = require("../images/images.service");
const mongoose_1 = require("@nestjs/mongoose");
const recipe_entity_1 = require("./entities/recipe.entity");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const rxjs_1 = require("rxjs");
const reviewRecipe_entity_1 = require("./entities/reviewRecipe.entity");
const forbidenWords_1 = require("../utils/forbidenWords");
let RecipesService = class RecipesService {
    constructor(recipeModel, recipeReviewModel, imagesService, usersService) {
        this.recipeModel = recipeModel;
        this.recipeReviewModel = recipeReviewModel;
        this.imagesService = imagesService;
        this.usersService = usersService;
    }
    async findById(_id) {
        const recipe = this.recipeModel.findById(_id);
        if (!recipe) {
            throw new common_1.NotFoundException("no se a encontrado la receta");
        }
        return recipe;
    }
    async createRecipe(createRecipeInput, file) {
        const newRecipe = new this.recipeModel(createRecipeInput);
        await this.usersService.findById(createRecipeInput.user_id);
        if (file) {
            const img_url = await this.imagesService.uploadFile(file);
            newRecipe.img_url = img_url;
        }
        console.log(newRecipe.save);
        return await newRecipe.save();
    }
    async getRecipe(_id) {
        const recipe = await this.recipeModel.findById(_id).populate({
            path: "user_id",
            model: "User",
            select: "_id userName"
        }).exec();
        if (!recipe) {
            throw new rxjs_1.NotFoundError("No se a encontrado la receta");
        }
        return recipe;
    }
    async listMyRecipes(id, page = 1, perPage = 20) {
        await this.usersService.findById(id);
        const recetas = await this.recipeModel.aggregate([
            {
                '$match': {
                    'user_id': '66d3bacdb06708e42f24149d'
                }
            }, {
                '$lookup': {
                    'from': 'reviewrecipes',
                    'let': {
                        'recipe_id': {
                            '$toString': '$_id'
                        }
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$recipe_id', '$$recipe_id'
                                    ]
                                }
                            }
                        }, {
                            '$project': {
                                '_id': 1
                            }
                        }
                    ],
                    'as': 'reviews'
                }
            }, {
                '$addFields': {
                    'review_count': {
                        '$size': '$reviews'
                    }
                }
            }
        ]);
        return recetas;
    }
    async listRecipeRandom(paginationDTO) {
        const { page = 1, limit = 10 } = paginationDTO;
        const skip = (page - 1) * limit;
        const randomRecipes = await this.recipeModel.aggregate([
            { $sample: { size: 100 } },
            {
                $lookup: {
                    from: 'reviewrecipes',
                    let: { recipe_id: { $toString: '$_id' } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$recipe_id', '$$recipe_id']
                                }
                            }
                        }
                    ],
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    'review_count': {
                        '$size': '$reviews'
                    }
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]).exec();
        console.log(randomRecipes);
        return randomRecipes;
    }
    async reviewRecipe(createReviewInput) {
        const oldReview = await this.recipeReviewModel.findOne({
            user_id: createReviewInput.user_id,
            recipe_id: createReviewInput.recipe_id
        });
        if (oldReview) {
            throw new common_1.BadRequestException("ya calificaste esta receta");
        }
        await this.findById(createReviewInput.recipe_id);
        await this.usersService.findById(createReviewInput.user_id);
        const newReview = new this.recipeReviewModel(createReviewInput);
        console.log(newReview);
        return newReview.save();
    }
    async validateRecipe(recipe) {
        const words = recipe.preparation.toLowerCase().split(/\s+/);
        const wordsforbiden = words.some(word => forbidenWords_1.forbiddenWords.has(word));
        console.log(wordsforbiden);
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(recipe_entity_1.Recipe.name)),
    __param(1, (0, mongoose_1.InjectModel)(reviewRecipe_entity_1.ReviewRecipe.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        images_service_1.ImagesService,
        users_service_1.UsersService])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map