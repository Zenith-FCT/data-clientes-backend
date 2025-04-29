import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Clientes')
export class Client {
  @PrimaryColumn({ type: 'varchar', length: 50, name: 'email'})
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'nombre'})
  nombre: string;

  @Column({ type: 'int', nullable: true, name: 'edad'})
  edad: number;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'sexo'})
  sexo: string;

  @Column({ type: 'int', nullable: true, name: 'CP'})
  cp: number;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'localidad'})
  localidad: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'pais'})
  pais: string;

  @Column({ type: 'date', nullable: true, name: 'fecha_lead'})
  fechaLead: Date;

  @Column({ type: 'date', nullable: true, name: 'fecha_1er_pedido'})
  fechaPrimerPedido: Date;

  @Column({ type: 'int', nullable: true, name: 'periodo_conversion'})
  periodoConversion: number;

  @Column({ type: 'date', nullable: true, name: 'fecha_ult_pedido'})
  fechaUltimoPedido: Date;

  @Column({ type: 'int', nullable: true, name: 'tiempo_ltv'})
  tiempoLtv: number;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'entrada_lead'})
  entradaLead: string;

  @Column({ type: 'int', default: 0, name: 'numero_pedidos'})
  numeroPedidos: number;

  @Column({ type: 'int', default: 0, name: 'LTV'})
  ltv: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, name: 'TM'})
  tm: number;

  @Column({ type: 'int', nullable: true, name: 'periodo_medio_compra'})
  periodoMedioCompra: number;

  @Column({ type: 'int', nullable: true, name: 'periodo_desde_ultimo_pedido'})
  periodoDesdeUltimoPedido: number;
}
