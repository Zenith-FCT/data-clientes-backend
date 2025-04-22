import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Pedidos')
export class OrdersInvoicesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'Fecha_Pedido', type: 'date' })
    fechaPedido: Date;
    
    @Column({ name: 'Total_Pedido', type: 'decimal', precision: 10, scale: 2 })
    totalPedido: number;
}
