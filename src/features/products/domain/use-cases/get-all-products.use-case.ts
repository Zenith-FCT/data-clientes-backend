import { Inject, Injectable, Logger } from '@nestjs/common';
import { ProductModel } from '../models/product.model';
import { IProductsRepository, PRODUCTS_REPOSITORY } from '../interfaces/iproducts.repository';

@Injectable()
export class GetAllProductsUseCase {
  private readonly logger = new Logger(GetAllProductsUseCase.name);
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private productsRepository: IProductsRepository
  ) {}
  
  async execute(): Promise<ProductModel[]> {
    try {
      return await this.productsRepository.getAllProducts();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error executing GetAllProductsUseCase: ${errorMessage}`, errorStack);
      throw new Error(`Failed to retrieve products: ${errorMessage}`);
    }
  }
}
