import { Injectable } from '@nestjs/common';
import { config } from './config';

@Injectable()
export class AppService {
  isAlive(): string {
    return 'Hey, ' + config.APP_NAME + ' is alive.';
  }
}
