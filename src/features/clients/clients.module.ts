import { Module } from '@nestjs/common';
import { ClientsService } from './data/database/clients.service';
import { ClientsController } from './presentation/clients.controller';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
