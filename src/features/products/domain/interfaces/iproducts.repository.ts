import { ProductModel } from '../models/product.model';

export const PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';

export interface IProductsRepository {
  getAllProducts(): Promise<ProductModel[]>;
  // Aquí puedes añadir más métodos según necesites
  // Como getProductBySku(sku: string): Promise<ProductModel | null>;
  // getProductsByCategory(category: string): Promise<ProductModel[]>;
}
