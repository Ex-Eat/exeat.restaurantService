import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Article } from '../article/article.schema';
import { Menu } from '../menu/menu.schema';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop()
  restaurant_name: string;

  @Prop()
  professional_mail: string;

  @Prop()
  phone_number: string;

  @Prop()
  terms_of_use: boolean;

  @Prop({
    type: {
      lat: Number,
      lng: Number,
      address: String,
      name: String,
    },
  })
  location: {
    lat: number;
    lng: number;
    address: string;
    name: string;
  };

  @Prop()
  patronage_code: string;

  @Prop()
  notifiction: boolean;

  @Prop()
  restaurant_image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' })
  menus: [Menu];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
  articles: [Article];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
