import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {Connection, Model, Types} from 'mongoose';
import { Article, ArticleDocument } from './article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(article: Article): Promise<ArticleDocument> {
    const createdArticle = new this.articleModel(article);
    return await createdArticle.save();
  }

  async findAll(): Promise<ArticleDocument[]> {
    return await this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<ArticleDocument> {
    return await this.articleModel.findById(id).populate('restaurantId').exec();
  }

  async findByRestaurantId(_id: string): Promise<Article[]> {
    return await this.articleModel.find({ restaurantId: new Types.ObjectId(_id) }).exec();
  }

  async update(id: string, article: Article): Promise<ArticleDocument> {
    return await this.articleModel.findByIdAndUpdate(id, article, {
      new: true,
    });
  }

  async delete(id: string): Promise<ArticleDocument> {
    return await this.articleModel.findByIdAndRemove(id);
  }
}
