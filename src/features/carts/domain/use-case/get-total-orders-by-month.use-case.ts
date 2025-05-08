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
      const queryResult = await this.ordersInvoicesRepository
        .createQueryBuilder('order')
        .select('CAST(COUNT(*) AS CHAR)', 'total')
        .addSelect('DATE_FORMAT(order.fechaPedido, "%Y-%m")', 'date')
        .groupBy('DATE_FORMAT(order.fechaPedido, "%Y-%m")')
        .orderBy('date', 'DESC')
        .getRawMany();
      
      return queryResult.map((row) => {
        const rowObj = row as Record<string, unknown>;
        const totalValue = rowObj.total ? String(rowObj.total) : '0';
        const dateValue = rowObj.date ? String(rowObj.date) : '';
        
        return new TotalOrders(totalValue, dateValue);
      });
    } catch (error) {
      console.error('Error en la consulta de pedidos por mes:', error);
      throw error;
    }
  }
}