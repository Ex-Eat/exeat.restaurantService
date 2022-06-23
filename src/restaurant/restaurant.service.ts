import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './restaurant.schema';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(restaurant: Restaurant): Promise<RestaurantDocument> {
    const createdRestaurant = new this.restaurantModel(restaurant);
    return await createdRestaurant.save();
  }

  async findAll(): Promise<RestaurantDocument[]> {
    return await this.restaurantModel.find().exec();
  }

  async findOne(id: string): Promise<RestaurantDocument> {
    return await this.restaurantModel.findById(id).exec();
  }

  async update(
    id: string,
    restaurant: Restaurant,
  ): Promise<RestaurantDocument> {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
    });
  }

  async delete(id: string): Promise<RestaurantDocument> {
    return await this.restaurantModel.findByIdAndRemove(id);
  }

  async findWithMenus(id: string): Promise<RestaurantDocument> {
    return await this.restaurantModel.findById(id).populate('menus').exec();
  }
}
