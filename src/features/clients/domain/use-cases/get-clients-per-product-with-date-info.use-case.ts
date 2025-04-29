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
      return await this.clientsRepository.getClientsPerProductWithDateInfo();
    } catch (error) {
      this.logger.error(`Error executing GetClientsPerProductWithDateInfoUseCase: ${error.message}`, error.stack);
      throw error;
    }
  }
}
