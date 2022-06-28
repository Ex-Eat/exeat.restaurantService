import {forwardRef, Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {MongooseModule} from '@nestjs/mongoose';
import {RestaurantController} from './restaurant.controller';
import {Restaurant, RestaurantSchema} from './restaurant.schema';
import {RestaurantService} from './restaurant.service';
import {MenuModule} from "../menu/menu.module";
import {ArticleModule} from "../article/article.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Restaurant.name, schema: RestaurantSchema},
        ]),
        HttpModule,
        forwardRef(() => MenuModule),
        forwardRef(() => ArticleModule)
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService],
    exports: [RestaurantService],
})
export class RestaurantModule {
}
