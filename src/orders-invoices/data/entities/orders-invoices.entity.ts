import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Pedidos')
export class OrdersInvoicesEntity {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({ name: 'Fecha_Pedido', type: 'date' })
    fechaPedido: Date;
    
    @Column({ name: 'Total_Pedido', type: 'decimal', precision: 10, scale: 2 })
    totalPedido: number;
}
