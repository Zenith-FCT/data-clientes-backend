import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersInvoicesEntity } from '../data/entities/orders-invoices.entity';

export class MonthlySalesModel {
    constructor(
        public id: string,
        public date: string,
        public totalSales: string,
        public totalSalesNumber: string
    ) {}
}

@Injectable()
export class GetAllMonthlySalesUseCase {
    constructor(
        @InjectRepository(OrdersInvoicesEntity)
        private ordersRepository: Repository<OrdersInvoicesEntity>
    ) {}    async execute(): Promise<MonthlySalesModel[]> {
        try {
            const pedidos = await this.ordersRepository.find();
            
            const monthlySalesMap = new Map();
            
            pedidos.forEach(pedido => {
                const date = new Date(pedido.fechaPedido);
                const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                
                if (!monthlySalesMap.has(yearMonth)) {
                    monthlySalesMap.set(yearMonth, {
                        orders: 0,
                        total: 0
                    });
                }
                
                const monthData = monthlySalesMap.get(yearMonth);
                monthData.orders += 1;
                monthData.total += Number(pedido.totalPedido);
            });
            
            const monthlySalesData = Array.from(monthlySalesMap.entries())
                .map(([yearMonth, data]) => ({
                    yearMonth,
                    totalOrders: data.orders,
                    totalAmount: data.total
                }))
                .sort((a, b) => b.yearMonth.localeCompare(a.yearMonth)); 
            
            return monthlySalesData.map(item => {
                const uniqueId = `sales-${item.yearMonth}`;
                
                return new MonthlySalesModel(
                    uniqueId,
                    item.yearMonth,
                    item.totalAmount.toString(),
                    item.totalOrders.toString()
                );
            });
        } catch (error) {
            console.error('Error al obtener ventas mensuales:', error);
            throw error;
        }
    }
}
