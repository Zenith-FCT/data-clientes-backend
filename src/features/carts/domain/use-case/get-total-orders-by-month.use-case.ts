import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersInvoicesEntity } from '../../../orders-invoices/data/entities/orders-invoices.entity';
import { TotalOrders } from '../models/carts-models';

interface RawQueryResult {
  total: string;
  date: string;
}

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
      
      return queryResult.map((row): TotalOrders => {
       if (typeof row !== 'object' || row === null) {
          throw new Error('Formato de resultado inválido');
        }
        
        const total = 'total' in row ? String(row.total) : '0';
        const date = 'date' in row ? String(row.date) : '';
        
        return new TotalOrders(total, date);
      });
    } catch (error) {
      console.error('Error en la consulta de pedidos por mes:', error);
      throw error;
    }
  }
}