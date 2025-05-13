import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../orders-invoices/data/entities/orders-invoices.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
    async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productRepository.find();
      if (!products || products.length === 0) {
        this.logger.debug('No products found in database');
      }
      return products;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error fetching all products: ${errorMessage}`, errorStack);
      throw new Error(`Error fetching products: ${errorMessage}`);
    }
  }
}
