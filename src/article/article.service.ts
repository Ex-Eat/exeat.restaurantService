import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(article: Article): Promise<Article> {
    const createdArticle = new this.articleModel(article);
    return await createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return await this.articleModel
      .findById(id)
      .populate('restaurant_id')
      .exec();
  }

  async update(id: string, article: Article): Promise<Article> {
    return await this.articleModel.findByIdAndUpdate(id, article, {
      new: true,
    });
  }

  async delete(id: string): Promise<Article> {
    return await this.articleModel.findByIdAndRemove(id);
  }
}
