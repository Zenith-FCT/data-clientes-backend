import { Inject, Injectable, Logger } from '@nestjs/common';
import { OrderModel } from '../models/order.model';
import { IOrdersRepository, ORDERS_REPOSITORY } from '../interfaces/iorders.repository';

@Injectable()
export class GetAllOrdersUseCase {
  private readonly logger = new Logger(GetAllOrdersUseCase.name);

  constructor(
    @Inject(ORDERS_REPOSITORY)
    private ordersRepository: IOrdersRepository
  ) {}
  
  async execute(): Promise<OrderModel[]> {
    try {
      return await this.ordersRepository.getAllOrders();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error executing GetAllOrdersUseCase: ${errorMessage}`, errorStack);
      throw new Error(`Failed to retrieve orders: ${errorMessage}`);
    }
  }
}
