import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmptyModule } from './empty/empty.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
      }),
    }),EmptyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
