import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import {
    DISH_REPOSITORY,
    type DishRepository,
} from '../modules/dishes/dish.repository';

import type { Dish } from '../modules/dishes/dish.types';

import { CreateDishDto } from './dto/create-dish.dto';

import { RESTAURANTS } from '../modules/dishes/dish.seed';

@Injectable()
export class DishesService {
    constructor(
        @Inject(DISH_REPOSITORY)
        private readonly repository: DishRepository,
    ) { }

    findAll(restaurantId?: number): Dish[] {
        if (restaurantId !== undefined) {
            return this.repository.byRestaurantId(restaurantId);
        }

        return this.repository.all();
    }

    findOne(id: number): Dish {
        const dish = this.repository.byId(id);

        if (!dish) {
            throw new NotFoundException(`Dish with ID ${id} was not found.`);
        }

        return dish;
    }

    create(dto: CreateDishDto): Dish {
        const restaurantExists = RESTAURANTS.some(
            (restaurant) => restaurant.id === dto.restaurantId,
        );

        if (!restaurantExists) {
            throw new NotFoundException(
                `Restaurant with ID ${dto.restaurantId} was not found.`,
            );
        }

        const dish: Dish = {
            id: Date.now(),
            restaurantId: dto.restaurantId,
            name: dto.name,
            priceSantim: dto.priceSantim,
        };

        this.repository.save(dish);

        return dish;
    }
}