import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MenuService } from 'src/menu/menu.service';
import { RestaurantDocument } from 'src/restaurant/restaurant.schema';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CreateArticleDto } from './article.dto';
import { Article } from './article.schema';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(
    private _service: ArticleService,
    private _restaurantService: RestaurantService,
    private _menuService: MenuService,
  ) {}

  @MessagePattern({ cmd: 'article/findallfromrestaurant' })
  async findAll(data: { restaurantId: string }): Promise<any> {
    return (
      await (
        await this._restaurantService.findOne(data.restaurantId)
      ).populate('articles')
    ).articles;
  }

  @MessagePattern({ cmd: 'article/findone' })
  async getOne(data: { id: string }): Promise<any> {
    return this._service.findOne(data.id);
  }

  @MessagePattern({ cmd: 'article/create' })
  async create(data: { restaurantId: string; article: any }): Promise<any> {
    let article = await this._service.create({
      ...data.article,
      menus: [],
      restaurantId: data.restaurantId,
    });
    let restaurant = await this._restaurantService.findOne(data.restaurantId);

    restaurant.articles.push(article);
    await restaurant.save();

    return article;
  }

  @MessagePattern({ cmd: 'article/update' })
  async update(data: { id: string; article: Article }) {
    return this._service.update(data.id, data.article);
  }

  @MessagePattern({ cmd: 'article/delete' })
  async delete(data: { id: string }): Promise<any> {
    let article = await this._service.findOne(data.id);
    let restaurant = article.restaurantId;
    restaurant.articles.splice(restaurant.articles.indexOf(article), 1);
    this._restaurantService.update(restaurant._id.toString(), restaurant);

    for (let menuId of article.menus) {
      let menu = await this._menuService.findOne(menuId.toString());
      menu.articles.splice(menu.articles.indexOf(article), 1);
      if (menu.articles.length == 0) {
        await this._menuService.delete(menu._id.toString());
      } else {
        this._menuService.update(menu._id.toString(), menu);
      }
    }

    return this._service.delete(data.id);
  }
}
