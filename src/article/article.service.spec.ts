import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { Article } from './article.schema';
import { ArticleService } from './article.service';

const oneArticle: Article = plainToClass(Article, {
  _id: '5e9f8f8f8f8f8f8f8f8f8f8f',
  name: 'Article 1',
  article_image: 'https://www.google.com/img/1.jpg',
  price: 5,
});

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
