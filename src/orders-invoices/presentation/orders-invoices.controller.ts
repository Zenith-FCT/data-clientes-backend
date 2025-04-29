import { Controller, Get } from '@nestjs/common';
import { OrdersInvoicesService } from '../data/orders-invoices.service';
import { GetAllOrdersInvoiceForProductUseCase } from '../domain/use-case/get-all-orders-invoice-for-product.use-case';
import { GetLtvMonthlyUseCase } from '../domain/use-case/get-ltv-monthly.use-case';
import { GetOrdersInvoiceClientTypeUseCase } from '../domain/use-case/get-orders-invoice-client-type.use-case';

@Controller()
export class OrdersInvoicesController {

  constructor(
    private service: OrdersInvoicesService,
    private ordersProductsUseCase: GetAllOrdersInvoiceForProductUseCase,
    private getLtvMonthlyUseCase: GetLtvMonthlyUseCase,
    private getOrdersInvoiceClientTypeUseCase: GetOrdersInvoiceClientTypeUseCase
  ) { }

  @Get('monthly_totals')
  findAll() {
    return this.service.getAllMonthlySales();
  }

  @Get('orders-invoice-product-type')
  async getAllOrdersInvoiceForProduct(): Promise<any[]> {
   
    return this.ordersProductsUseCase.execute();
  }
  @Get('ltv')
  async getLtvMonthly(): Promise<any[]> {
    return this.getLtvMonthlyUseCase.execute();
  }
  @Get('orders-invoice-client-type')
  async getOrdersInvoiceClientType(): Promise<any[]> {
    return this.getOrdersInvoiceClientTypeUseCase.execute();
  }

  
}
