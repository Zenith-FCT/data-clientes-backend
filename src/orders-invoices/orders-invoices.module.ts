import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersInvoicesController } from './presentation/orders-invoices.controller';
import { OrdersInvoicesEntity, Order, Product, Client } from './data/entities/orders-invoices.entity';
import { OrdersInvoicesService } from './data/orders-invoices.service';
import { GetAllMonthlySalesUseCase } from './domain/use-case/get-all-monthly-sales.use-case';
import { GetAllOrdersInvoiceForProductUseCase } from './domain/use-case/get-all-orders-invoice-for-product.use-case';
import { GetLtvMonthlyUseCase } from './domain/use-case/get-ltv-monthly.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersInvoicesEntity, Order, Product, Client])],
  providers: [
    OrdersInvoicesService, 
    GetAllMonthlySalesUseCase,
    GetAllOrdersInvoiceForProductUseCase,
    GetLtvMonthlyUseCase
  ],
  controllers: [OrdersInvoicesController]
})
export class OrdersInvoicesModule { }
