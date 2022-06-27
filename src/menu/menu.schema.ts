import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from '../article/article.schema';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop()
  menu_image: string;

  @Prop({ required: true, type: String })
  price: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Article' })
  articles: Article[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
