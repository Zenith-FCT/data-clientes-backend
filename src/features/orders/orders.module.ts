import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './data/entities/order.entity';
import { OrdersService } from './data/orders.service';
import { OrdersDataRepository } from './data/orders-data.repository';
import { ORDERS_REPOSITORY } from './domain/interfaces/iorders.repository';
import { GetAllOrdersUseCase } from './domain/use-cases/get-all-orders.use-case';
import { OrdersController } from './presentation/orders.controller';
import { OrderResponseMapper } from './presentation/mappers/order-response.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: ORDERS_REPOSITORY,
      useClass: OrdersDataRepository,
    },
    GetAllOrdersUseCase,
    OrderResponseMapper
  ],
  exports: [OrdersService]
})
export class OrdersModule {}
