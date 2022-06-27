import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongSchema } from 'mongoose';
import { Menu } from 'src/menu/menu.schema';
import { Restaurant } from 'src/restaurant/restaurant.schema';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  article_image: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: MongSchema.Types.ObjectId, ref: 'Restaurant' })
  restaurant_id: Restaurant;

  @Prop({ type: [MongSchema.Types.ObjectId], ref: 'Menu' })
  menus: Menu[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
