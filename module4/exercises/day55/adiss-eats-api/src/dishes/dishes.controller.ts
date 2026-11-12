import {
    Controller,
    Get,
    Post,
    Param,
    Query,
    Body,
    ParseIntPipe,
} from '@nestjs/common';

import { DishesService } from './dishes.service';

import { CreateDishDto } from './dto/create-dish.dto';

@Controller('dishes')
export class DishesController {
    constructor(
        private readonly dishesService: DishesService,
    ) { }

    // GET /api/dishes
    @Get()
    findAll(@Query('restaurantId') restaurantId?: string) {
        return this.dishesService.findAll(
            restaurantId === undefined
                ? undefined
                : Number(restaurantId),
        );
    }

    // GET /api/dishes/:id
    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.dishesService.findOne(id);
    }

    // POST /api/dishes
    @Post()
    create(@Body() dto: CreateDishDto) {
        return this.dishesService.create(dto);
    }
}
