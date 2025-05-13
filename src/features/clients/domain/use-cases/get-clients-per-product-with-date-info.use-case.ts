import { Inject, Injectable, Logger } from '@nestjs/common';
import { CLIENTS_REPOSITORY, IClientsRepository } from '../interfaces/iclients.repository';
import { ProductClientDistributionWithDateModel } from '../models/product-client-distribution-with-date.model';

@Injectable()
export class GetClientsPerProductWithDateInfoUseCase {
  private readonly logger = new Logger(GetClientsPerProductWithDateInfoUseCase.name);

  constructor(
    @Inject(CLIENTS_REPOSITORY)
    private clientsRepository: IClientsRepository
  ) {}

  async execute(): Promise<ProductClientDistributionWithDateModel[]> {
    try {
      return await this.clientsRepository.getClientsPerProductWithDateInfo();    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error executing GetClientsPerProductWithDateInfoUseCase: ${errorMessage}`, errorStack);
      throw error;
    }
  }
}
