import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.entity';
import { ImagesModule } from 'src/images/images.module';
import { RecipeController } from './recipe.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    ImagesModule
  ],
  controllers: [RecipeController],
  providers: [RecipesResolver, RecipesService],
})
export class RecipesModule {}
