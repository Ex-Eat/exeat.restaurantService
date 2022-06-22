import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {config} from "./config";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hey, ' + config.APP_NAME + ' is alive."', () => {
      expect(appController.isAlive()).toBe('Hey, ' + config.APP_NAME + ' is alive.');
    });
  });
});
