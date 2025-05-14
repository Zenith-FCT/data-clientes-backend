import { OrderModel } from '../models/order.model';

export const ORDERS_REPOSITORY = 'ORDERS_REPOSITORY';

export interface IOrdersRepository {
  getAllOrders(): Promise<OrderModel[]>;
  // Aquí puedes añadir más métodos según necesites
}
