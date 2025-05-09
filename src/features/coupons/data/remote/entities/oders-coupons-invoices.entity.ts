import {Column,Entity,PrimaryGeneratedColumn} from 'typeorm';

@Entity('pedidos')
export class OrdersCouponsEntity {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({ name: 'Fecha_Pedido', type: 'date' })
    fechaPedido: Date;

    @Column({ name: 'Total_descuento'})
    totalDescuento: number;

    @Column({ name: 'Nombre_cupon_descuento' })
    nombreCuponDescuento: string;
}

