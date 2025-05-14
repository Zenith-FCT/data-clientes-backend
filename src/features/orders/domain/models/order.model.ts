import { OrderProductModel } from './order-product.model';

export interface OrderModel {
  id: string;
  numero_pedido: string;
  fecha_pedido: string;
  nombre_cliente: string;
  email: string;
  total_pedido: string;
  total_descuento: string;
  nombre_cupon_descuento: string;
  productos: OrderProductModel[];
}
