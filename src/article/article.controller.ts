import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RestaurantDocument } from 'src/restaurant/restaurant.schema';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Article } from './article.schema';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(
    private _service: ArticleService,
    private _restaurantService: RestaurantService,
  ) {}

  @MessagePattern({ cmd: 'article/findallfromrestaurant' })
  async findAll(data: { id: string }): Promise<any> {
    return (
      await (
        await this._restaurantService.findOne(data.id)
      ).populate('articles')
    ).articles;
  }

  @MessagePattern({ cmd: 'article/findone' })
  async getOne(data: { id: string }): Promise<any> {
    return this._service.findOne(data.id);
  }

  @MessagePattern({ cmd: 'article/create' })
  async create(data: { restaurant_id: string; article: any }): Promise<any> {
    let article = await this._service.create({
      ...data.article,
      restaurant_id: data.restaurant_id,
    });
    let restaurant = await this._restaurantService.findOne(data.restaurant_id);

    restaurant.articles.push(article);
    await restaurant.save();

    return article;
  }

  @MessagePattern({ cmd: 'article/delete' })
  async delete(data: { id: string }): Promise<any> {
    let article = await this._service.findOne(data.id);
    let restaurant = article.restaurant_id;
    restaurant.articles.splice(restaurant.articles.indexOf(article), 1);
    this._restaurantService.update(restaurant._id, restaurant);
    // console.log(restaurant);
    return this._service.delete(data.id);
  }
}
