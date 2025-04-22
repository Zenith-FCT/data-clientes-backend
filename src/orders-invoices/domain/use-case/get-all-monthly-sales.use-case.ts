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
        const monthlySalesData = await this.ordersRepository
            .createQueryBuilder('Pedidos')
            .select("DATE_FORMAT(Pedidos.fechaPedido, '%Y-%m')", 'yearMonth')
            .addSelect('COUNT(*)', 'totalOrders')
            .addSelect('SUM(Pedidos.totalPedido)', 'totalAmount')
            .groupBy('yearMonth')
            .orderBy('yearMonth', 'DESC')
            .getRawMany();

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
