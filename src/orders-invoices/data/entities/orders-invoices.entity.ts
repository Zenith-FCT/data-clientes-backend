import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('Pedidos')
export class OrdersInvoicesEntity {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({ name: 'Fecha_Pedido', type: 'date' })
    fechaPedido: Date;
    
    @Column({ name: 'Total_Pedido', type: 'decimal', precision: 10, scale: 2 })
    totalPedido: number;
}

@Entity('Pedidos')
export class Order {
  @PrimaryColumn({ name: 'numero_pedido', type: 'varchar', length: 20 })
  numeroPedido: string;

  @Column({ name: 'fecha_pedido', type: 'date' })
  fechaPedido: Date;

  @Column({ name: 'productos_sku', type: 'varchar', length: 255 })
  productosSku: string;

  @Column({ name: 'total_pedido', type: 'decimal', precision: 10, scale: 2 })
  totalPedido: number;

  @Column({ name: 'total_descuento', type: 'decimal', precision: 10, scale: 2 })
  totalDescuento: number;
}

@Entity('Productos')
export class Product {
  @PrimaryColumn({ name: 'SKU', type: 'varchar', length: 50 })
  sku: string;

  @Column({ name: 'Nombre_producto', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'Categoria', type: 'varchar', length: 100 })
  categoria: string;

  @Column({ name: 'Precio', type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ name: 'Stock', type: 'int' })
  stock: number;
}
