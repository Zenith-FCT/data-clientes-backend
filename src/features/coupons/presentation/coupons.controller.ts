import {Controller,Get,Query} from '@nestjs/common';
import {GetAvailableYearsUseCase} from '../domain/use-cases/get-available-years.use-case';
import {GetCouponsInfoByMonthUseCase} from '../domain/use-cases/get-coupons-info-by-month';
import {GetCouponsInfoByYearUseCase} from '../domain/use-cases/get-coupons-info-by-year';
import {GetCouponsUseCase} from '../domain/use-cases/get-coupons.use-case';
import {GetTotalCouponsUseCase} from '../domain/use-cases/get-total-coupons.use-case';
import {GetTotalDiscountCouponsUseCase} from '../domain/use-cases/get-total-discount-coupons.use-case';

@Controller('coupons')
export class CouponsController {
    constructor(
        private getCouponsUseCase: GetCouponsUseCase,
        private getAvailableYearsUseCase: GetAvailableYearsUseCase,
        private getTotalCouponsUseCase: GetTotalCouponsUseCase,
        private getTotalDiscountCouponsUseCase: GetTotalDiscountCouponsUseCase,
        private getCouponsInfoByYearUseCase: GetCouponsInfoByYearUseCase,
        private getCouponsInfoByMonthUseCase: GetCouponsInfoByMonthUseCase
    ) {}

    @Get('coupons')
    findAll() {
        return this.getCouponsUseCase.execute()
    }

    @Get('availableYears')
    getAvailableYears() {
        return this.getAvailableYearsUseCase.execute()
    }

    @Get('total')
    getTotal() {
        return {total: this.getTotalCouponsUseCase.execute()}
    }

    @Get('totalDiscount')
    getTotalDiscount() {
        return {total: this.getTotalDiscountCouponsUseCase.execute()}
    }

    @Get('infoByYear')
    getInfoByYear(@Query('year') year: string) {
        return this.getCouponsInfoByYearUseCase.execute(year)
    }

    
    @Get('infoByMonth')
    getInfoByMonth(@Query('year') year: string, @Query('month') month: string) {
        return this.getCouponsInfoByMonthUseCase.execute(year, month)
    }
   
}
