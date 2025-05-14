import { Injectable } from '@nestjs/common';
import { OrderModel } from '../../domain/models/order.model';
import { OrderProductModel } from '../../domain/models/order-product.model';

/**
 * Mapper para transformar modelos de dominio en objetos de respuesta para la API
 */
@Injectable()
export class OrderResponseMapper {
  
  /**
   * Transforma un modelo de producto dentro de un pedido en objeto de respuesta para la API
   * @param product El modelo de producto a transformar
   * @returns El objeto de respuesta para la API
   */
  private toProductResponse(product: OrderProductModel): Record<string, string> {
    if (!product) {
      return {
        nombre_producto: '',
        sku: '',
        categoria: ''
      };
    }
    
    return {
      nombre_producto: product.nombre_producto || '',
      sku: product.sku || '',
      categoria: product.categoria || ''
    };
  }

  /**
   * Transforma un modelo de pedido en objeto de respuesta para la API
   * @param order El modelo de pedido a transformar
   * @returns El objeto de respuesta para la API
   */
  toResponse(order: OrderModel): Record<string, any> {
    if (!order) {
      throw new Error('Cannot map null or undefined order');
    }
    
    return {
      id: order.id || '',
      numero_pedido: order.numero_pedido || '',
      fecha_pedido: order.fecha_pedido || '',
      nombre_cliente: order.nombre_cliente || '',
      email: order.email || '',
      total_pedido: order.total_pedido || '0',
      total_descuento: order.total_descuento || '0',
      nombre_cupon_descuento: order.nombre_cupon_descuento || 'N/A',
      productos: Array.isArray(order.productos) 
        ? order.productos.map(product => this.toProductResponse(product))
        : []
    };
  }

  /**
   * Transforma una lista de modelos de pedido en objetos de respuesta para la API
   * @param orders La lista de modelos de pedido a transformar
   * @returns La lista de objetos de respuesta para la API
   */
  toResponseList(orders: OrderModel[]): Record<string, any>[] {
    if (!orders || !Array.isArray(orders)) {
      return [];
    }
    
    return orders.map(order => this.toResponse(order));
  }
}
