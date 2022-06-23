import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from '../article/article.schema';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
  @Prop()
  name: string;

  @Prop()
  menu_image: string;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
  articles: [Article];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
