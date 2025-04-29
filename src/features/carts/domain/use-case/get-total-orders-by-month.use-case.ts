import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersInvoicesEntity } from '../../../orders-invoices/data/entities/orders-invoices.entity';
import { TotalOrders } from '../models/carts-models';

@Injectable()
export class GetTotalOrdersByMonthUseCase {
  constructor(
    @InjectRepository(OrdersInvoicesEntity)
    private ordersInvoicesRepository: Repository<OrdersInvoicesEntity>,
  ) {}

  async execute(): Promise<TotalOrders[]> {
    try {
      const result = await this.ordersInvoicesRepository
        .createQueryBuilder('order')
        .select('COUNT(*)', 'total')
        .addSelect('DATE_FORMAT(order.fechaPedido, "%Y-%m")', 'date')
        .groupBy('DATE_FORMAT(order.fechaPedido, "%Y-%m")')
        .orderBy('date', 'DESC')
        .getRawMany();
      
      return result.map(item => new TotalOrders(
        item.total.toString(),
        item.date
      ));
    } catch (error) {
      console.error('Error en la consulta de pedidos por mes:', error);
      throw error;
    }
  }
}