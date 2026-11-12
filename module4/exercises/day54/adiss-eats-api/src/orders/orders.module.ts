import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

import { OrderService } from '../modules/orders/order.service';

import {
  ORDER_REPOSITORY,
  InMemoryOrderRepository,
} from '../modules/orders/order.repository';

@Module({
  controllers: [OrdersController],

  providers: [
    OrdersService,
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: InMemoryOrderRepository,
    },
  ],
})
export class OrdersModule { }