import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientModel } from '../models/client.model';
import { CLIENTS_REPOSITORY, IClientsRepository } from '../interfaces/iclients.repository';

@Injectable()
export class GetAllClientsUseCase {
  private readonly logger = new Logger(GetAllClientsUseCase.name);

  constructor(
    @Inject(CLIENTS_REPOSITORY)
    private clientsRepository: IClientsRepository
  ) {}

  async execute(): Promise<ClientModel[]> {
    try {
      return await this.clientsRepository.getAllClients();
    } catch (error) {
      this.logger.error(`Error executing GetAllClientsUseCase: ${error.message}`, error.stack);
      throw error;
    }
  }
}
