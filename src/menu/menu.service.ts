import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Menu, MenuDocument } from './menu.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private MenuModel: Model<MenuDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(menu: Menu): Promise<Menu> {
    const createdMenu = new this.MenuModel(menu);
    return await createdMenu.save();
  }

  async findAll(): Promise<Menu[]> {
    return await this.MenuModel.find().exec();
  }

  async findOne(id: string): Promise<Menu> {
    return await this.MenuModel.findById(id).populate('articles').exec();
  }

  async update(id: string, menu: Menu): Promise<Menu> {
    return await this.MenuModel.findByIdAndUpdate(id, menu, {
      new: true,
    });
  }

  async delete(id: string): Promise<Menu> {
    return await this.MenuModel.findByIdAndRemove(id);
  }

  async getWithArticles(id: string): Promise<Menu> {
    return await this.MenuModel.findById(id).populate('articles').exec();
  }
}
