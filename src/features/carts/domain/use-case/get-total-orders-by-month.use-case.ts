import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersInvoicesEntity } from '../../../orders-invoices/data/entities/orders-invoices.entity';
import { TotalOrders } from '../models/carts-models';

// Definir un tipo seguro para los resultados
type OrderCountResult = {
  total: string;
  date: string;
};

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
      
      const typedResults: OrderCountResult[] = queryResult.map(row => ({
        total: String(row.total),
        date: String(row.date)
      }));
      
      return typedResults.map(item => 
        new TotalOrders(item.total, item.date)
      );
    } catch (error) {
      console.error('Error en la consulta de pedidos por mes:', error);
      throw error;
    }
  }
}