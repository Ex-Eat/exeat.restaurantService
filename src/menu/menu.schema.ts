import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Restaurant } from 'src/restaurant/restaurant.schema';
import { Article } from '../article/article.schema';

export type MenuDocument = Menu & Document;

@Schema({ timestamps: true })
export class Menu {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop()
  menuImage: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Article' })
  articles: Article[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
  restaurantId: Restaurant;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
