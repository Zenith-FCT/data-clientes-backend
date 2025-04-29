export interface ClientModel {
  email: string;
  nombre: string;
  edad?: number;
  sexo?: string;
  cp?: number;
  localidad?: string;
  pais?: string;
  fechaLead?: Date;
  fechaPrimerPedido?: Date;
  periodoConversion?: number;
  fechaUltimoPedido?: Date;
  tiempoLtv?: number;
  entradaLead?: string;
  numeroPedidos: number;
  ltv: number;
  tm?: number;
  periodoMedioCompra?: number;
  periodoDesdeUltimoPedido?: number;
}
