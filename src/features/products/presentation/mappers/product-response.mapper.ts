import { Injectable } from '@nestjs/common';
import { ProductModel } from '../../domain/models/product.model';

/**
 * Mapper para transformar modelos de dominio en objetos de respuesta para la API
 */
@Injectable()
export class ProductResponseMapper {
    /**
   * Transforma un modelo de producto en objeto de respuesta para la API
   * Mantenemos los nombres tal como están en la base de datos para consistencia
   * @param product El modelo de producto a transformar
   * @returns El objeto de respuesta para la API
   */
  toResponse(product: ProductModel): Record<string, string | number> {
    if (!product) {
      throw new Error('Cannot map null or undefined product');
    }
    
    return {
      SKU: product.sku || '',
      Nombre_producto: product.nombre || '',
      Categoria: product.categoria || '',
      Precio: typeof product.precio === 'number' ? product.precio : 0,
      Stock: typeof product.stock === 'number' ? product.stock : 0
    };
  }

  /**
   * Transforma una lista de modelos de producto en objetos de respuesta para la API
   * @param products La lista de modelos de producto a transformar
   * @returns La lista de objetos de respuesta para la API
   */
  toResponseList(products: ProductModel[]): Record<string, string | number>[] {
    if (!products || !Array.isArray(products)) {
      return [];
    }
    
    return products.map(product => this.toResponse(product));
  }
}
