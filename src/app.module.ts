import {Module} from '@nestjs/common';
import {ConfigModule,ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CartsModule} from './features/carts/carts.module';
import {CartsEntity} from './features/carts/data/entities/carts.entity';
import {CouponsModule} from './features/coupons/coupons.module';
import {OrdersCouponsEntity} from './features/coupons/data/remote/entities/oders-coupons-invoices.entity';
import {EmptyModule} from './features/empty/empty.module';
import {Client,Order,OrdersInvoicesEntity,Product} from './features/orders-invoices/data/entities/orders-invoices.entity';
import {OrdersInvoicesModule} from './features/orders-invoices/orders-invoices.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,    
    }),    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [OrdersInvoicesEntity, Order, Product, Client, CartsEntity, OrdersCouponsEntity],
        synchronize: false,
      }),
    }),
    EmptyModule,
    OrdersInvoicesModule,
    CartsModule,
    CouponsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
