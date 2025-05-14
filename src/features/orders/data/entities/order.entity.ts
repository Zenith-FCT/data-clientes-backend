import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('pedidos')
export class Order {
  @PrimaryColumn({ name: 'numero_pedido', type: 'varchar', length: 20 })
  numeroPedido: string;

  @Column({ name: 'fecha_pedido', type: 'date' })
  fechaPedido: Date;

  @Column({ name: 'nombre_cliente', type: 'varchar', length: 100 })
  nombreCliente: string;

  @Column({ name: 'email', type: 'varchar', length: 100 })
  email: string;

  @Column({ name: 'total_pedido', type: 'decimal', precision: 10, scale: 2 })
  totalPedido: number;

  @Column({ name: 'total_descuento', type: 'decimal', precision: 10, scale: 2 })
  totalDescuento: number;

  @Column({ name: 'productos', type: 'varchar', length: 255 })
  productos: string;

  @Column({ name: 'productos_sku', type: 'varchar', length: 255 })
  productosSku: string;

  @Column({ name: 'categoria_productos', type: 'varchar', length: 100 })
  categoriaProductos: string;

  @Column({ name: 'nombre_cupon_descuento', type: 'varchar', length: 100 })
  nombreCuponDescuento: string;
}
