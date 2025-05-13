import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CLIENTS_REPOSITORY, IClientsRepository } from '../interfaces/iclients.repository';
import { ClientModel } from '../models/client.model';

@Injectable()
export class GetClientByEmailUseCase {
  private readonly logger = new Logger(GetClientByEmailUseCase.name);

  constructor(
    @Inject(CLIENTS_REPOSITORY)
    private clientsRepository: IClientsRepository
  ) {}

  async execute(email: string): Promise<ClientModel> {
    try {
      const client = await this.clientsRepository.getClientByEmail(email);
      
      if (!client) {
        throw new NotFoundException(`Client with email ${email} not found`);
      }
      
      return client;    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error executing GetClientByEmailUseCase: ${errorMessage}`, errorStack);
      throw error;
    }
  }
}
