import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from './data/carts.service';
import { GetAllCartsUseCase } from './domain/use-case/get-all-carts.use-case';
import { GetTotalOrdersByMonthUseCase } from './domain/use-case/get-total-orders-by-month.use-case';
import { CartsController } from './presentation/carts.controller';
import { CartsEntity } from './data/entities/carts.entity';
import { OrdersInvoicesEntity } from '../orders-invoices/data/entities/orders-invoices.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CartsEntity, OrdersInvoicesEntity])],
    providers: [
        CartsService,
        GetAllCartsUseCase,
        GetTotalOrdersByMonthUseCase
    ],
    controllers: [CartsController],
    exports: []
})
export class CartsModule {}