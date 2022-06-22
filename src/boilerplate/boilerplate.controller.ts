import {Controller, Get, Post} from '@nestjs/common';
import {BoilerplateService} from "./boilerplate.service";
import {Boilerplate} from "../schemas/boilerplate.schema";
import {CreateBoilerplateDto} from "../dto/create-boilerplate.dto";
import {MessagePattern} from "@nestjs/microservices";

@Controller('test_db')
export class BoilerplateController {
    constructor(private readonly boilerplateService: BoilerplateService) {}

    //@UseGuards(JwtGuard)
    @MessagePattern('getItems')
    getAll(): Promise<Boilerplate[]> {
        return this.boilerplateService.findAll();
    }

    @MessagePattern('postItem')
    postOne(): Promise<Boilerplate> {
        let bp:  Boilerplate = new CreateBoilerplateDto()
        bp.name = 'test'
        return this.boilerplateService.create(bp)
    }

}
