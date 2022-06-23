import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { BoilerplateModule } from './boilerplate/boilerplate.module';
import { RestaurantController } from './restaurant/restaurant.controller';
import { MenuController } from './menu/menu.controller';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';
import { MenuModule } from './menu/menu.module';
import { RestaurantService } from './restaurant/restaurant.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuService } from './menu/menu.service';
import { ArticleService } from './article/article.service';

@Module({
  imports: [
    //MongooseModule.forRoot(`mongodb://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`),
    MongooseModule.forRoot(
      `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`,
    ),
    ArticleModule,
    MenuModule,
    RestaurantModule,
  ],
  controllers: [
    AppController,
    RestaurantController,
    MenuController,
    ArticleController,
  ],
  providers: [AppService],
})
export class AppModule {}
