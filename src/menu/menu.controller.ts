import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { exit } from 'process';
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
      await (
        await this._restaurantService.findOne(data.restaurantId)
      ).populate({
        path: 'menus',
        populate: {
          path: 'articles',
        },
      })
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

    menu.articles.forEach(async (articleId) => {
      var article = await this._articleService.findOne(articleId.toString());

      if (article != null) {
        // console.log(article.menus);
        // return 'prout';
        article.menus.push(menu);
        await article.save();
      }
      return article;
    });

    restaurant.menus.push(menu);
    await restaurant.save();

    return menu;
  }

  @MessagePattern({ cmd: 'menu/update' })
  async update(data: { id: string; menu: any }): Promise<any> {
    let oldMenu = await this._service.findOne(data.id);
    let menu = await this._service.update(data.id, data.menu);

    for (const articleId of oldMenu.articles) {
      let article = await this._articleService.findOne(
        articleId._id.toString(),
      );
      // console.log(article.menus);
      article.menus = article.menus.filter(
        (id) => id.toString() != oldMenu._id.toString(),
      );
      // console.log(article.name + ' - Purged');
      article.save();
    }

    for (const articleId of menu.articles) {
      let article = await this._articleService.findOne(articleId.toString());

      article.menus.push(menu);
      // console.log(article.name + ' - Added');
      article.save();
    }

    return menu;
  }

  @MessagePattern({ cmd: 'menu/delete' })
  async delete(data: { id: string }): Promise<any> {
    let menu = await this._service.findOne(data.id);
    if (menu == null) {
      return;
    }

    let restaurant = await this._restaurantService.findOne(
      menu.restaurantId.toString(),
    );
    restaurant.menus.splice(restaurant.menus.indexOf(menu), 1);
    this._restaurantService.update(restaurant._id.toString(), restaurant);

    for (let articleId of menu.articles) {
      let article = await this._articleService.findOne(articleId.toString());
      if (article != null) {
        article.menus = article.menus.filter(
          (id) => id.toString() != menu._id.toString(),
        );
        article.save();
      }
    }
    return await this._service.delete(data.id);
  }
}
