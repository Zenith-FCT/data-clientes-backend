import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmptyModule } from './empty/empty.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'PMYSQL132.dns-servicio.com',
    port: 3306,
    username: 'incidentally',
    password: 'K|{4VzzCee7u76R[NF',
    database: '7686546_bbdd_demoCxD',
    entities: [],
    synchronize: true,
  }),EmptyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
