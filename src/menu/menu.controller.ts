import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ArticleService } from 'src/article/article.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CreateMenuDto } from './menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(
    private _service: MenuService,
    private _restaurantService: RestaurantService,
    private _articleService: ArticleService,
  ) {}

  @MessagePattern({ cmd: 'menu/findallfromrestaurant' })
  async findAll(data: { restaurantId: string }): Promise<any> {
    return (
      await (await this._restaurantService.findOne(data.restaurantId)).populate('menus')
    ).menus;
  }

  @MessagePattern({ cmd: 'menu/findone' })
  async getOne(data: { id: string }): Promise<any> {
    return this._service.findOne(data.id);
  }

  @MessagePattern({ cmd: 'menu/create' })
  async create(data: { restaurantId: string; menu: any }): Promise<any> {
    let menu = await this._service.create({
      ...data.menu,
      restaurantId: data.restaurantId,
    });
    let restaurant = await this._restaurantService.findOne(data.restaurantId);
    // menu.articles.forEach(async (articleId) => {
    //   var article = await this._articleService.findOne(articleId.toString());
    //   article.menus.push(menu);
    //   await article.save();
    //   return article;
    // });

    restaurant.menus.push(menu);
    await restaurant.save();

    return menu;
  }
}
