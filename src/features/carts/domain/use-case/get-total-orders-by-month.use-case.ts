import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersInvoicesEntity } from '../../../orders-invoices/data/entities/orders-invoices.entity';
import { TotalOrders } from '../models/carts-models';

interface QueryResult {
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
      const rawResults = await this.ordersInvoicesRepository
        .createQueryBuilder('order')
        .select('CAST(COUNT(*) AS CHAR)', 'total')
        .addSelect('DATE_FORMAT(order.fechaPedido, "%Y-%m")', 'date')
        .groupBy('DATE_FORMAT(order.fechaPedido, "%Y-%m")')
        .orderBy('date', 'DESC')
        .getRawMany();
      
      return rawResults
        .filter((row): row is Record<string, unknown> => 
          row !== null && typeof row === 'object'
        )
        .map(row => {
          const result: QueryResult = {
            total: '',
            date: ''
          };
          
          if ('total' in row && (typeof row.total === 'string' || typeof row.total === 'number')) {
            result.total = String(row.total);
          }
          
          if ('date' in row && (typeof row.date === 'string')) {
            result.date = row.date;
          }
          
          return new TotalOrders(
            result.total,
            result.date
          );
        });
    } catch (error) {
      console.error('Error en la consulta de pedidos por mes:', error);
      throw error;
    }
  }
}