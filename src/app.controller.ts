import {Controller} from '@nestjs/common';
import { AppService } from './app.service';
import {MessagePattern} from "@nestjs/microservices";
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern({cmd: 'sum'})
    async sumNumbers(data: Array<number>) {
        return { result: data.reduce((a, b) => a + b) }
    }

    @MessagePattern({cmd: 'alive'})
    async isAlive() {
        return this.appService.isAlive()
    }
}
