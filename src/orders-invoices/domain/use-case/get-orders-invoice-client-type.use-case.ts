import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../data/entities/orders-invoices.entity';
import { InvoiceClientsTypeModel } from '../models/order-invoice-client-type-mode';

interface ClientCount {
    email: string;
    orderCount: string;
}

interface MonthlyOrderData {
    yearMonth: string;
    unique_orders_total: string;
    unique_orders_count: string;
    recurrent_orders_total: string;
    recurrent_orders_count: string;
}

@Injectable()
export class GetOrdersInvoiceClientTypeUseCase {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>
    ) {}    async execute(): Promise<InvoiceClientsTypeModel[]> {
        try {
            const clientOrderCounts = await this.ordersRepository
                .createQueryBuilder('pedidos')
                .select('pedidos.email', 'email')
                .addSelect('COUNT(pedidos.numero_pedido)', 'orderCount')
                .where('pedidos.email IS NOT NULL')
                .groupBy('pedidos.email')
                .getRawMany() as ClientCount[];

            const uniqueClientEmails = new Set<string>();
            const recurrentClientEmails = new Set<string>();

            clientOrderCounts.forEach(client => {
                const pedidos = parseInt(client.orderCount);
                if (pedidos === 1) {
                    uniqueClientEmails.add(client.email);
                } else if (pedidos > 1) {
                    recurrentClientEmails.add(client.email);
                }
            }); 
            const monthlyData = await this.ordersRepository
                .createQueryBuilder('pedidos')
                .select("DATE_FORMAT(pedidos.fecha_pedido, '%Y-%m')", 'yearMonth')
                .addSelect('COUNT(DISTINCT CASE WHEN pedidos.email IN (:...uniqueEmails) THEN pedidos.email END)', 'unique_clients_count')
                .addSelect('COUNT(CASE WHEN pedidos.email IN (:...uniqueEmails) THEN 1 END)', 'unique_orders_count')
                .addSelect('COALESCE(SUM(CASE WHEN pedidos.email IN (:...uniqueEmails) THEN pedidos.total_pedido ELSE 0 END), 0)', 'unique_orders_total')
                .addSelect('COUNT(DISTINCT CASE WHEN pedidos.email IN (:...recurrentEmails) THEN pedidos.email END)', 'recurrent_clients_count')
                .addSelect('COUNT(CASE WHEN pedidos.email IN (:...recurrentEmails) THEN 1 END)', 'recurrent_orders_count')
                .addSelect('COALESCE(SUM(CASE WHEN pedidos.email IN (:...recurrentEmails) THEN pedidos.total_pedido ELSE 0 END), 0)', 'recurrent_orders_total')
                .where('pedidos.email IS NOT NULL')
                .setParameter('uniqueEmails', Array.from(uniqueClientEmails))
                .setParameter('recurrentEmails', Array.from(recurrentClientEmails))
                .groupBy('yearMonth')
                .orderBy('yearMonth', 'ASC')
                .getRawMany() as MonthlyOrderData[];
                
            if (!monthlyData || monthlyData.length === 0) {
                return [];
            }
            
            return monthlyData.map(row => {
                return new InvoiceClientsTypeModel(
                    `client-type-${row.yearMonth}`,
                    row.yearMonth,
                    row.recurrent_orders_total || '0.00',
                    row.unique_orders_total || '0.00',
                    row.recurrent_orders_count || '0',
                    row.unique_orders_count || '0'
                );
            });
        } catch (error) {
            console.error('Error en GetOrdersInvoiceClientTypeUseCase:', error);
            throw error;
        }
    }
}
