import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { config } from '../config';
import { ICreateRestaurantDto } from './restaurant.dto';
import { Restaurant } from './restaurant.schema';
import { RestaurantService } from './restaurant.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { Article } from 'src/article/article.schema';
import { Menu } from 'src/menu/menu.schema';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private _service: RestaurantService,
    private _httpService: HttpService,
  ) {}

  @MessagePattern({ cmd: 'restaurant/findall' })
  async getAll(): Promise<any> {
    return this._service.findAll();
  }

  @MessagePattern({ cmd: 'restaurant/findone' })
  async getOne(data: { id: string }): Promise<any> {
    return this._service.findOne(data.id);
  }

  @MessagePattern({ cmd: 'restaurant/findallbyuser' })
  async findAllByUser(data: { user: any }): Promise<any> {
    return this._service.findAllByUser(data.user.id);
  }

  @MessagePattern({ cmd: 'restaurant/create' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(data: {
    restaurant: ICreateRestaurantDto;
    user: any;
  }): Promise<any> {
    let response;

    const restaurant = new Restaurant();
    if (data.restaurant.terms_of_use) {
      restaurant.terms_of_use = data.restaurant.terms_of_use;
    } else {
      throw new Error('You need to accept the terms of use.');
    }
    restaurant.owner_id = data.user.id;
    restaurant.name = data.restaurant.name;
    restaurant.description = data.restaurant.description;
    restaurant.keywords = data.restaurant.keywords;
    restaurant.professional_mail = data.restaurant.professional_mail;
    restaurant.phone_number = data.restaurant.phone_number;
    restaurant.articles = [];
    restaurant.menus = [];

    // Get the coordinates from the name of the address, using the geocoding API geoapify.com

    response = await lastValueFrom(
      this._httpService
        .get(
          'https://api.geoapify.com/v1/geocode/search?text=' +
            encodeURI(data.restaurant.address) +
            '&apiKey=' +
            process.env.GEOCODING_API_KEY,
        )
        .pipe(map((response) => response.data)),
    );

    restaurant.location = {
      lat: response.features[0].properties.lat,
      lng: response.features[0].properties.lon,
      address: response.features[0].properties.formatted,
    };

    return this._service.create(restaurant);
  }

  @MessagePattern({ cmd: 'restaurant/update' })
  async update(data: { id: string; restaurant: any }): Promise<any> {
    // Get the coordinates from the name of the address, using the geocoding API geoapify.com

    if (data.restaurant.address) {
      let response = await lastValueFrom(
        this._httpService
          .get(
            'https://api.geoapify.com/v1/geocode/search?text=' +
              encodeURI(data.restaurant.address) +
              '&apiKey=' +
              process.env.GEOCODING_API_KEY,
          )
          .pipe(map((response) => response.data)),
      );

      data.restaurant.location = {
        lat: response.features[0].properties.lat,
        lng: response.features[0].properties.lon,
        address: response.features[0].properties.formatted,
      };
    }

    return this._service.update(data.id, data.restaurant);
  }

  @MessagePattern({ cmd: 'restaurant/delete' })
  async delete(data: { id: string; authorization: string }): Promise<any> {
    return this._service.delete(data.id);
  }

  @MessagePattern({ cmd: 'restaurant/findwithmenus' })
  async findWithMenus(id: string): Promise<any> {
    return this._service.findWithMenus(id);
  }
}
