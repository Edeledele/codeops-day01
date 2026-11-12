import {
    Injectable,
    Inject,
    NotFoundException,
} from '@nestjs/common';

import { OrderService } from '../modules/orders/order.service';

import {
    ORDER_REPOSITORY,
    type OrderRepository,
} from '../modules/orders/order.repository';

import { OrderNotFoundError } from '../modules/orders/order.errors';

import type { Order } from '../modules/orders/order.types';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderService: OrderService,

        @Inject(ORDER_REPOSITORY)
        private readonly repository: OrderRepository,
    ) { }

    findAll(): Order[] {
        return this.repository.all();
    }

    findOne(id: number): Order {
        try {
            return this.orderService.find(id);
        } catch (error: unknown) {
            if (error instanceof OrderNotFoundError) {
                throw new NotFoundException(error.message);
            }

            throw error;
        }
    }

    create(dto: CreateOrderDto): Order {
        const order: Order = {
            id: Date.now(),
            customerName: dto.customerName,
            phone: dto.teleBirrPhone ?? '',
            area: dto.area,
            dishes: [],
            status: 'PENDING',
            totalSantim: dto.totalSantim,
        };

        this.repository.save(order);

        return order;
    }
}