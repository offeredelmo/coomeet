import { RecipesService } from './recipes.service';
import { CreateRecipeInput } from './dto/create-recipe.input';
export declare class RecipesResolver {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(createRecipeInput: CreateRecipeInput): Promise<string>;
    findAll(): Promise<string>;
}
