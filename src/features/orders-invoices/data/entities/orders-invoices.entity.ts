import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('pedidos')
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

@Entity('Clientes')
export class Client {
  @PrimaryColumn({ type: 'varchar', length: 255, name: 'email'})
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'Nombre'})
  nombre: string;

  @Column({ type: 'int', nullable: true, name: 'Edad'})
  edad: number;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'Sexo'})
  sexo: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'CP'})
  cp: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'Localidad'})
  localidad: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'Pais'})
  pais: string;

  @Column({ type: 'timestamp', nullable: true, name: 'Fecha_Lead'})
  fechaLead: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'Fecha_1er_Pedido'})
  fechaPrimerPedido: Date;

  @Column({ type: 'int', nullable: true, name: 'Periodo_Conversión'})
  periodoConversion: number;

  @Column({ type: 'timestamp', nullable: true, name: 'Fecha_Ult_Pedido'})
  fechaUltimoPedido: Date;

  @Column({ type: 'int', nullable: true, name: 'Tiempo_LTV' })
  tiempoLtvDuration: number;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'Entrada_Lead'})
  entradaLead: string;

  @Column({ type: 'int', default: 0, name: 'Nº_Pedidos'})
  numeroPedidos: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00, name: 'LTV' })
  ltv: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'TM'})
  tm: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'Periodo_medio_compra' })
  periodoMedioCompra: number;

  @Column({ type: 'int', nullable: true, name: 'Periodo_desde_ultimo_pedido' })
  periodoDesdeUltimoPedido: number;
}