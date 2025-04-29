import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersInvoicesController } from './presentation/orders-invoices.controller';
import { OrdersInvoicesEntity } from './data/entities/orders-invoices.entity';
import { OrdersInvoicesService } from './data/orders-invoices.service';
import { GetAllMonthlySalesUseCase } from './domain/use-case/get-all-monthly-sales.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersInvoicesEntity])],
  providers: [OrdersInvoicesService, GetAllMonthlySalesUseCase],
  controllers: [OrdersInvoicesController]
})
export class OrdersInvoicesModule { }
