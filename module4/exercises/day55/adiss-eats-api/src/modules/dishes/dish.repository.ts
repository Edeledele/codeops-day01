import type { Dish } from './dish.types';

export const DISH_REPOSITORY = 'DISH_REPOSITORY';

export interface DishRepository {
    all(): Dish[];
    byId(id: number): Dish | undefined;
    byRestaurantId(restaurantId: number): Dish[];
    save(dish: Dish): void;
}

export class InMemoryDishRepository implements DishRepository {
    private readonly dishes = new Map<number, Dish>();

    constructor(initialDishes: Dish[] = []) {
        for (const dish of initialDishes) {
            this.dishes.set(dish.id, dish);
        }
    }

    all(): Dish[] {
        return Array.from(this.dishes.values());
    }

    byId(id: number): Dish | undefined {
        return this.dishes.get(id);
    }

    byRestaurantId(restaurantId: number): Dish[] {
        return this.all().filter(
            (dish) => dish.restaurantId === restaurantId,
        );
    }

    save(dish: Dish): void {
        this.dishes.set(dish.id, dish);
    }
}