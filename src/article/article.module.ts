import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { ArticleController } from './article.controller';
import { Article, ArticleSchema } from './article.schema';
import { ArticleService } from './article.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    RestaurantModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
