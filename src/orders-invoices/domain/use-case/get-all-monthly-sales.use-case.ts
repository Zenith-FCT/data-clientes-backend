import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersInvoicesEntity } from '../../data/entities/orders-invoices.entity';
import { MonthlySalesModel } from '../models/monthly-sales-model';


@Injectable()
export class GetAllMonthlySalesUseCase {
    constructor(
        @InjectRepository(OrdersInvoicesEntity)
        private ordersRepository: Repository<OrdersInvoicesEntity>
    ) {}

    async execute(): Promise<MonthlySalesModel[]> {
       
        const monthlySalesData = await this.ordersRepository.query(`
            SELECT
                DATE_FORMAT(Fecha_Pedido, '%Y-%m') as yearMonth,
                COUNT(*) as totalOrders,
                SUM(Total_Pedido) as totalAmount
            FROM
                Pedidos
            GROUP BY
                yearMonth
            ORDER BY
                yearMonth DESC
        `);

       
        return monthlySalesData.map(item => {
            
            const uniqueId = `sales-${item.yearMonth}`;
            
            return new MonthlySalesModel(
                uniqueId,
                item.yearMonth,
                item.totalAmount.toString(),
                item.totalOrders.toString() 
            );
        });
    }
}
