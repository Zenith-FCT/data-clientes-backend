import { Injectable, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrdersRepository } from '../domain/interfaces/iorders.repository';
import { OrderModel } from '../domain/models/order.model';
import { OrderProductModel } from '../domain/models/order-product.model';

@Injectable()
export class OrdersDataRepository implements IOrdersRepository {
  private readonly logger = new Logger(OrdersDataRepository.name);

  constructor(private ordersService: OrdersService) {}

  async getAllOrders(): Promise<OrderModel[]> {
    try {
      const orders = await this.ordersService.getAllOrders();
      
      return orders.map(order => {
        // Procesamos los productos - en este caso los productos están separados por barras '/'
        // Este enfoque maneja mejor los nombres de productos que contienen espacios
        const productNames = order.productos ? order.productos.split(' / ').map(item => item.trim()) : [];
        const productSkus = order.productosSku ? order.productosSku.split(' / ').map(item => item.trim()) : [];
        const productCategories = order.categoriaProductos ? order.categoriaProductos.split(' / ').map(item => item.trim()) : [];
        
        // Creamos un array de productos - uno por cada SKU
        const orderProducts: OrderProductModel[] = [];
        
        // Si todos los arrays tienen la misma longitud, asumimos que cada índice corresponde a un producto
        const maxLength = Math.min(
          productSkus.length || 0, 
          productNames.length || 0,
          productCategories.length || productSkus.length || 1 // Si no hay categorías, usamos la longitud de SKUs
        );
        
        // Si no tenemos productos separados, intentamos crear uno con toda la información disponible
        if (maxLength === 0 && (order.productos || order.productosSku || order.categoriaProductos)) {
          orderProducts.push({
            nombre_producto: order.productos || '',
            sku: order.productosSku || '',
            categoria: order.categoriaProductos || ''
          });
        } else {
          // Procesamos cada producto individualmente
          for (let i = 0; i < maxLength; i++) {
            orderProducts.push({
              nombre_producto: productNames[i] || '',
              sku: productSkus[i] || '',
              categoria: productCategories[i] || ''
            });
          }
        }

        // Transformamos la entidad Order a OrderModel
        return {
          id: order.numeroPedido,
          numero_pedido: order.numeroPedido,
          fecha_pedido: order.fechaPedido instanceof Date 
            ? order.fechaPedido.toISOString().split('T')[0] 
            : String(order.fechaPedido),
          nombre_cliente: order.nombreCliente || '',
          email: order.email || '',
          total_pedido: order.totalPedido?.toString() || '0',
          total_descuento: order.totalDescuento?.toString() || '0',
          nombre_cupon_descuento: order.nombreCuponDescuento || 'N/A',
          productos: orderProducts
        };
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error in OrdersDataRepository.getAllOrders: ${errorMessage}`, errorStack);
      throw new Error(`Failed to retrieve orders from repository: ${errorMessage}`);
    }
  }
}
