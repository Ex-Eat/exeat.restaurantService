
import {Connection, Model} from 'mongoose';
import { Injectable } from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import { Boilerplate, BoilerplateDocument } from '../schemas/boilerplate.schema';
import { CreateBoilerplateDto } from '../dto/create-boilerplate.dto';

@Injectable()
export class BoilerplateService {
    constructor(
        @InjectModel(Boilerplate.name) private boilerplateModel: Model<BoilerplateDocument>,
        @InjectConnection() private connection: Connection
    ) {}

    async create(createBoilerplateDto: CreateBoilerplateDto): Promise<Boilerplate> {
        const createdBoilerplate = new this.boilerplateModel(createBoilerplateDto);
        return createdBoilerplate.save();
    }

    async findAll(): Promise<Boilerplate[]> {
        return this.boilerplateModel.find().exec();
    }
}