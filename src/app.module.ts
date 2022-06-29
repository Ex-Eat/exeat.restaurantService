import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { RestaurantController } from './restaurant/restaurant.controller';
import { MenuController } from './menu/menu.controller';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';
import { MenuModule } from './menu/menu.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //MongooseModule.forRoot(`mongodb://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`),
    MongooseModule.forRoot(
      `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`,
      {
        autoIndex: true,
      },
    ),
    ArticleModule,
    MenuModule,
    RestaurantModule,
    HttpModule,
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
