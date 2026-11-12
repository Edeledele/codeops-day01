import { Inject, Injectable } from '@nestjs/common';

import type { Area, Order } from './order.types';
import { OrderNotFoundError } from './order.errors';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: OrderRepository,
  ) { }

  find(id: number): Order {
    const order = this.repository.byId(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  all(): Order[] {
    return this.repository.all();
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 5000,
      Kazanchis: 6000,
      Piassa: 7000,
      Gerji: 8000,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repository.all().map((order) => order[key]);
  }
}