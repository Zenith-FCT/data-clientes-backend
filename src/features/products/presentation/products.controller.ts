import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllProductsUseCase } from '../domain/use-cases/get-all-products.use-case';
import { ProductResponseMapper } from './mappers/product-response.mapper';

@ApiTags('products')
@Controller('productos')
export class ProductsController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly productResponseMapper: ProductResponseMapper
  ) {}
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all products',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          SKU: { type: 'string' },
          Nombre_producto: { type: 'string' },
          Categoria: { type: 'string' },
          Precio: { type: 'number' },
          Stock: { type: 'number' }
        }
      }
    }
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllProducts() {
    try {
      const products = await this.getAllProductsUseCase.execute();
      return this.productResponseMapper.toResponseList(products);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        { message: 'Error fetching products', error: errorMessage },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
