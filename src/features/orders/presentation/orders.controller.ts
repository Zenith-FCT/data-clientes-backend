import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllOrdersUseCase } from '../domain/use-cases/get-all-orders.use-case';
import { OrderResponseMapper } from './mappers/order-response.mapper';

@ApiTags('orders')
@Controller('pedidos')
export class OrdersController {
  constructor(
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly orderResponseMapper: OrderResponseMapper
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all orders',
    schema: {
      properties: {
        pedidos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              numero_pedido: { type: 'string' },
              fecha_pedido: { type: 'string', format: 'date' },
              nombre_cliente: { type: 'string' },
              email: { type: 'string' },
              total_pedido: { type: 'string' },
              total_descuento: { type: 'string' },
              nombre_cupon_descuento: { type: 'string' },
              productos: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    nombre_producto: { type: 'string' },
                    sku: { type: 'string' },
                    categoria: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })  async getAllOrders() {
    try {
      const orders = await this.getAllOrdersUseCase.execute();
      // Return as direct array for json-server compatibility
      return this.orderResponseMapper.toResponseList(orders);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        { message: 'Error fetching orders', error: errorMessage },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
