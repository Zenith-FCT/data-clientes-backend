import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersInvoicesService } from '../data/orders-invoices.service';
import { CreateOrdersInvoicesDto } from './dto/create-orders-invoices.dto';
import { UpdateOrdersInvoicesDto } from './dto/update-orders-invoices.dto';

@Controller()
export class OrdersInvoicesController {

  constructor(private service: OrdersInvoicesService) { }

  @Get('monthly-sales')
  findAll() {
    return this.service.getAllMonthlySales();
  }
}
