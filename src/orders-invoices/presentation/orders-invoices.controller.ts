import { Controller, Get } from '@nestjs/common';
import { OrdersInvoicesService } from '../data/orders-invoices.service';
import { GetAllOrdersInvoiceForProductUseCase } from '../domain/use-case/get-all-orders-invoice-for-product.use-case';
import { Order, Product } from '../data/entities/orders-invoices.entity';

@Controller()
export class OrdersInvoicesController {

  constructor(
    private service: OrdersInvoicesService,
    private ordersProductsUseCase: GetAllOrdersInvoiceForProductUseCase
  ) { }

  @Get('monthly_totals')
  findAll() {
    return this.service.getAllMonthlySales();
  }

  @Get('orders-invoice-product-type')
  async getAllOrdersInvoiceForProduct(): Promise<any[]> {
   
    return this.ordersProductsUseCase.execute();
  }

  
}
