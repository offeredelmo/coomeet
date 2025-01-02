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
const mongoose_1 = require("@nestjs/mongoose");
const recipe_entity_1 = require("./entities/recipe.entity");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const reviewRecipe_entity_1 = require("./entities/reviewRecipe.entity");
const aws_bucket_service_1 = require("../aws-bucket/aws-bucket.service");
const create_aws_bucket_dto_1 = require("../aws-bucket/dto/create-aws-bucket.dto");
const mongodb_1 = require("mongodb");
let RecipesService = class RecipesService {
    constructor(recipeModel, recipeReviewModel, awsBucketService, usersService) {
        this.recipeModel = recipeModel;
        this.recipeReviewModel = recipeReviewModel;
        this.awsBucketService = awsBucketService;
        this.usersService = usersService;
    }
    async findById(_id) {
        const recipe = this.recipeModel.findById(_id);
        if (!recipe) {
            throw new common_1.NotFoundException("no se a encontrado la receta");
        }
        return recipe;
    }
    async createRecipe(createRecipeInput) {
        const newRecipe = new this.recipeModel(createRecipeInput);
        await this.usersService.findById(createRecipeInput.user_id);
        newRecipe.user_id = new mongodb_1.ObjectId(newRecipe.user_id);
        console.log(newRecipe.save);
        return await newRecipe.save();
    }
    async updateRecipe(updateRecipeInput) {
        try {
            console.log();
            const updateRecipe = await this.recipeModel.findOneAndUpdate({ _id: new mongodb_1.ObjectId(updateRecipeInput._id) }, {
                $set: updateRecipeInput
            }, {
                new: true
            });
            console.log(updateRecipe);
            return updateRecipe;
        }
        catch (error) {
            console.log(error);
        }
    }
    async addImgeToImage(_id, file) {
        try {
            console.log(_id);
            console.log("hola");
            const fileExtension = file.originalname.split(".").pop();
            const keyNameUrlImg = `${_id}.${fileExtension}`;
            const urlImage = await this.awsBucketService.uploadImageAndReturnUrl(new create_aws_bucket_dto_1.UploadFileDto("doc-preuba-01-117", `users/recipe/img/${keyNameUrlImg}`, file.buffer)).catch((err) => {
                console.error("Error uploading file to AWS:", err);
                throw new Error("File upload failed");
            });
            await this.recipeModel.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(_id) }, {
                $set: { "img_url": `${urlImage.Location}`, "key_img_url": `${urlImage.key}` }
            }, { new: true });
            return urlImage;
        }
        catch (error) {
            console.error("Error in addImgeToImage:", error.message);
            throw new Error("Failed to add image to recipe. Please try again.");
        }
    }
    async getRecipe(_id) {
        const recipe = await this.recipeModel.findById(_id).populate({
            path: "user_id",
            model: "User",
            select: "_id userName"
        }).exec();
        if (!recipe) {
            throw new common_1.NotFoundException("No se a encontrado la receta");
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
    async listRecipeByTag(tag) {
        try {
            const recipes = await this.recipeModel.aggregate([
                {
                    '$match': {
                        'tags': tag
                    }
                }
            ]);
            return recipes;
        }
        catch (error) {
            throw new common_1.HttpException('Error server', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async search(text) {
        try {
            if (!text) {
                return [];
            }
            console.log(text);
            const arraytext = text.split(" ");
            const recipes = await this.recipeModel.aggregate([
                {
                    '$match': {
                        '$or': [
                            { 'tags': { '$in': arraytext } },
                            { 'title': { '$regex': text, '$options': 'i' } },
                        ]
                    }
                }
            ]);
            return recipes;
        }
        catch (error) {
            console.error("Error en la búsqueda:", error.message);
            throw new Error("No se pudo realizar la búsqueda");
        }
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(recipe_entity_1.Recipe.name)),
    __param(1, (0, mongoose_1.InjectModel)(reviewRecipe_entity_1.ReviewRecipe.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        aws_bucket_service_1.AwsBucketService,
        users_service_1.UsersService])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map