import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../data/entities/orders-invoices.entity';
import { MonthlySalesModel } from '../models/monthly-sales-model';

interface MonthlySalesRawData {
    yearMonth: string;
    totalOrders: number;
    totalAmount: number;
}

@Injectable()
export class GetAllMonthlySalesUseCase {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>
    ) {}      
    
    async execute(): Promise<MonthlySalesModel[]> {
        const monthlySalesData = await this.ordersRepository
            .createQueryBuilder('pedidos')
            .select("DATE_FORMAT(pedidos.fecha_pedido, '%Y-%m')", 'yearMonth')
            .addSelect('COUNT(*)', 'totalOrders')
            .addSelect('SUM(pedidos.total_pedido)', 'totalAmount')
            .groupBy('yearMonth')
            .orderBy('yearMonth', 'DESC')
            .getRawMany() as MonthlySalesRawData[];

        return monthlySalesData.map((item: MonthlySalesRawData) => {
            const [year, month] = item.yearMonth.split('-');
            
            return new MonthlySalesModel(
                month,
                parseInt(year),
                item.totalAmount,
                item.totalOrders
            );
        });
    }
}
