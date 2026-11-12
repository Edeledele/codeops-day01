import { Module } from '@nestjs/common';

import { OrdersModule } from './orders/orders.module';
import { DishesModule } from './dishes/dishes.module';

@Module({
  imports: [
    OrdersModule,
    DishesModule,
  ],
})
export class AppModule { }