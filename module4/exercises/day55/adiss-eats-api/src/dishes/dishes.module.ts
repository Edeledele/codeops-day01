import { Module } from '@nestjs/common';

import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';

import {
    DISH_REPOSITORY,
    InMemoryDishRepository,
} from '../modules/dishes/dish.repository';

import { INITIAL_DISHES } from '../modules/dishes/dish.seed';

@Module({
    controllers: [DishesController],

    providers: [
        DishesService,
        {
            provide: DISH_REPOSITORY,
            useFactory: () => new InMemoryDishRepository(INITIAL_DISHES),
        },
    ],
})
export class DishesModule { }