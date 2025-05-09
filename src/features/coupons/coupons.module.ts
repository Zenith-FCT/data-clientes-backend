import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CouponsService} from './data/remote/coupons.service';
import {OrdersCouponsEntity} from './data/remote/entities/oders-coupons-invoices.entity';
import {GetAvailableYearsUseCase} from './domain/use-cases/get-available-years.use-case';
import {GetCouponsInfoByMonthUseCase} from './domain/use-cases/get-coupons-info-by-month';
import {GetCouponsInfoByYearUseCase} from './domain/use-cases/get-coupons-info-by-year';
import {GetCouponsUseCase} from './domain/use-cases/get-coupons.use-case';
import {GetTotalCouponsUseCase} from './domain/use-cases/get-total-coupons.use-case';
import {GetTotalDiscountCouponsUseCase} from './domain/use-cases/get-total-discount-coupons.use-case';
import {CouponsController} from './presentation/coupons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersCouponsEntity])],
  controllers: [CouponsController],
  providers: [CouponsService, GetCouponsUseCase, GetAvailableYearsUseCase, GetTotalCouponsUseCase, GetTotalDiscountCouponsUseCase, GetCouponsInfoByYearUseCase, GetCouponsInfoByMonthUseCase],
})
export class CouponsModule {}
