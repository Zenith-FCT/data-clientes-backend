import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsController } from './presentation/carts.controller';
import { CartsService } from './data/carts.service';
import { GetAllCartsUseCase } from './domain/use-case/get-all-carts.use-case';
import { GetTotalOrdersByMonthUseCase } from './domain/use-case/get-total-orders-by-month.use-case';
import { CartsEntity } from './data/entities/carts.entity';
import { Order } from '../orders-invoices/data/entities/orders-invoices.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CartsEntity, Order])],
    controllers: [CartsController],
    providers: [CartsService, GetAllCartsUseCase, GetTotalOrdersByMonthUseCase]
})
export class CartsModule {}