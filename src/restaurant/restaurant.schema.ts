import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Article } from '../article/article.schema';
import { Menu } from '../menu/menu.schema';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true })
export class Restaurant {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  globalUserId: number;

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
  professionalMail: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  phoneNumber: string;

  @Prop({
    required: true,
    type: String,
  })
  termsOfUse: boolean;

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
  patronageCode: string;

  @Prop({
    type: Boolean,
  })
  notification: boolean;

  @Prop({
    type: String,
  })
  restaurantImage: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Menu' })
  menus: Menu[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Article' })
  articles: Article[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
