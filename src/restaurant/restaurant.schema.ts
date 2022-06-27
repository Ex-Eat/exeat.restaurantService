import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Article } from '../article/article.schema';
import { Menu } from '../menu/menu.schema';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  _id: string;

  @Prop({ required: true })
  owner_id: number;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: [String],
  })
  keywords: string[];

  @Prop({
    required: true,
    type: String,
  })
  professional_mail: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  phone_number: string;

  @Prop({
    required: true,
    type: String,
  })
  'terms_of_use': boolean;

  @Prop({
    type: {
      lat: Number,
      lng: Number,
      address: String,
    },
    unique: true,
  })
  location: {
    lat: number;
    lng: number;
    address: string;
  };

  @Prop({
    type: String,
  })
  patronage_code: string;

  @Prop({
    type: Boolean,
  })
  notifiction: boolean;

  @Prop({
    type: String,
  })
  restaurant_image: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Menu' })
  menus: Menu[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Article' })
  articles: Article[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
