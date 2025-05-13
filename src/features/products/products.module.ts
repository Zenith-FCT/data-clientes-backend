import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../orders-invoices/data/entities/orders-invoices.entity';
import { ProductsService } from './data/products.service';
import { GetAllProductsUseCase } from './domain/use-cases/get-all-products.use-case';
import { ProductsController } from './presentation/products.controller';
import { ProductResponseMapper } from './presentation/mappers/product-response.mapper';
import { ProductsDataRepository } from './data/products-data.repository';
import { PRODUCTS_REPOSITORY } from './domain/interfaces/iproducts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: ProductsDataRepository,
    },
    GetAllProductsUseCase,
    ProductResponseMapper
  ],
  exports: [ProductsService]
})
export class ProductsModule {}
