import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from './data/carts.service';
import { GetAllCartsUseCase } from './domain/use-case/get-all-carts.use-case';
import { CartsController } from './presentation/carts.controller';
import { CartsEntity } from './data/entities/carts.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CartsEntity])],
    providers: [
        CartsService,
        GetAllCartsUseCase
    ],
    controllers: [CartsController],
    exports: []
})
export class CartsModule {}