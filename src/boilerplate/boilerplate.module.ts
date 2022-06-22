
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoilerplateController } from './boilerplate.controller';
import { BoilerplateService } from './boilerplate.service';
import { Boilerplate, BoilerplateSchema } from '../schemas/boilerplate.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Boilerplate.name, schema: BoilerplateSchema }])],
    controllers: [BoilerplateController],
    providers: [BoilerplateService],
})
export class BoilerplateModule {}
