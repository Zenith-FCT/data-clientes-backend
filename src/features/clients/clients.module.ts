import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './data/database/clients.service';
import { ClientsController } from './presentation/clients.controller';
import { Client } from './data/entities/client.entity';
import { Order, Product } from '../orders-invoices/data/entities/orders-invoices.entity';
import { ClientsDataRepository } from './data/clients-data.repository';
import { GetAllClientsUseCase } from './domain/use-cases/get-all-clients.use-case';
import { GetClientsPerProductWithDateInfoUseCase } from './domain/use-cases/get-clients-per-product-with-date-info.use-case';
import { GetClientByEmailUseCase } from './domain/use-cases/get-client-by-email.use-case';
import { CLIENTS_REPOSITORY } from './domain/interfaces/iclients.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Order, Product])
  ],
  controllers: [ClientsController],  providers: [
    ClientsService,
    {
      provide: CLIENTS_REPOSITORY,
      useClass: ClientsDataRepository,
    },
    GetAllClientsUseCase,
    GetClientsPerProductWithDateInfoUseCase,
    GetClientByEmailUseCase
  ],
  exports: [ClientsService]
})
export class ClientsModule {}
