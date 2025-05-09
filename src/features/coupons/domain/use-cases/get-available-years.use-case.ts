import {Injectable} from "@nestjs/common";
import {CouponsService} from "src/features/coupons/data/remote/coupons.service";
import {YearDataCoupon} from 'src/features/coupons/domain/models/year-coupon';

@Injectable()
export class GetAvailableYearsUseCase {
    constructor(private service: CouponsService) {}

    async execute(): Promise<YearDataCoupon[]> {
        return this.service.getAvailableYears()     
    }
}