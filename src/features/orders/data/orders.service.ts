import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  
  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find();
      if (!orders || orders.length === 0) {
        this.logger.debug('No orders found in database');
      }
      return orders;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error fetching all orders: ${errorMessage}`, errorStack);
      throw new Error(`Error fetching orders: ${errorMessage}`);
    }
  }
}
