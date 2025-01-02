import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { ReviewRecipe, ReviewRecipeSchema } from './entities/reviewRecipe.entity';
import { AwsBucketModule } from 'src/aws-bucket/aws-bucket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: ReviewRecipe.name, schema: ReviewRecipeSchema }
    ]),
    UsersModule,
    AwsBucketModule
  ],
  controllers: [RecipeController],
  providers: [RecipesResolver, RecipesService],

})
export class RecipesModule {}
