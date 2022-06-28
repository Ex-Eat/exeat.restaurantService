import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from 'src/article/article.module';
import { ArticleService } from 'src/article/article.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { MenuController } from './menu.controller';
import { Menu, MenuSchema } from './menu.schema';
import { MenuService } from './menu.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    forwardRef(() => RestaurantModule),
    forwardRef(() => ArticleModule),
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
