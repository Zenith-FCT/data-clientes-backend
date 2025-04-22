import { Controller, Get } from '@nestjs/common';
import { OrdersInvoicesService } from '../data/orders-invoices.service';

@Controller()
export class OrdersInvoicesController {

  constructor(private service: OrdersInvoicesService) { }

  @Get('monthly-sales')
  findAll() {
    return this.service.getAllMonthlySales();
  }
}
