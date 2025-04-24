import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersInvoicesController } from './presentation/orders-invoices.controller';
import { OrdersInvoicesEntity, Order, Product } from './data/entities/orders-invoices.entity';
import { OrdersInvoicesService } from './data/orders-invoices.service';
import { GetAllMonthlySalesUseCase } from './domain/use-case/get-all-monthly-sales.use-case';
import { GetAllOrdersInvoiceForProductUseCase } from './domain/use-case/get-all-orders-invoice-for-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersInvoicesEntity, Order, Product])],
  providers: [
    OrdersInvoicesService, 
    GetAllMonthlySalesUseCase,
    GetAllOrdersInvoiceForProductUseCase
  ],
  controllers: [OrdersInvoicesController]
})
export class OrdersInvoicesModule { }
