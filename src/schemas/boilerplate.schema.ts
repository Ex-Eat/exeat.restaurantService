import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BoilerplateDocument = Boilerplate & Document;

@Schema()
export class Boilerplate {
    @Prop()
    name: string;
}

export const BoilerplateSchema = SchemaFactory.createForClass(Boilerplate);
