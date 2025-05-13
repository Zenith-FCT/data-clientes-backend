import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProductsRepository } from '../domain/interfaces/iproducts.repository';
import { ProductModel } from '../domain/models/product.model';

@Injectable()
export class ProductsDataRepository implements IProductsRepository {
  private readonly logger = new Logger(ProductsDataRepository.name);

  constructor(private productsService: ProductsService) {}

  async getAllProducts(): Promise<ProductModel[]> {
    try {
      const products = await this.productsService.getAllProducts();
      
      // Mapear las entidades Product a ProductModel
      return products.map(product => ({
        sku: product.sku,
        nombre: product.nombre,
        categoria: product.categoria,
        precio: typeof product.precio === 'number' ? product.precio : parseFloat(String(product.precio)),
        stock: typeof product.stock === 'number' ? product.stock : parseInt(String(product.stock), 10)
      }));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error in ProductsDataRepository.getAllProducts: ${errorMessage}`, errorStack);
      throw new Error(`Failed to retrieve products from repository: ${errorMessage}`);
    }
  }
}
