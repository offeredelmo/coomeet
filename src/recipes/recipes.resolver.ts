import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RecipesService } from './recipes.service';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) { }

  @Mutation(() => Recipe)
  async createRecipe(@Args('createRecipeInput') createRecipeInput: CreateRecipeInput) {
    return "Hola mundo"
  }

  @Query(() => [Recipe], { name: 'recipes' })
  async findAll() {
    return "Hola mundo"
  }

  

}
