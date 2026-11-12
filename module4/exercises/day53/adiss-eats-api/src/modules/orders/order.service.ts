
import { Order, Area } from "./order.types";
import { OrderNotFoundError } from "./order.errors";
import { OrderRepository } from "./order.repository";

export class OrderService {
  constructor(
    private readonly repository: OrderRepository
  ) { }

  find(id: number): Order {
    const order = this.repository.byId(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
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
    return this.repository.all().map(order => order[key]);
  }
}
