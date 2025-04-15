import { Module } from '@nestjs/common';
import { EmptyService } from './data/remote/empty.service';
import { EmptyController } from './presentation/empty.controller';

@Module({
  controllers: [EmptyController],
  providers: [EmptyService],
})
export class EmptyModule {}
