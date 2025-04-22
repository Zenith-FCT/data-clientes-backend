import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmptyModule } from './empty/empty.module';
import { OrdersInvoicesModule } from './orders-invoices/orders-invoices.module';
import { OrdersInvoicesEntity } from './orders-invoices/data/entities/orders-invoices.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,    }),    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [OrdersInvoicesEntity],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
      }),
    }),EmptyModule,OrdersInvoicesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
