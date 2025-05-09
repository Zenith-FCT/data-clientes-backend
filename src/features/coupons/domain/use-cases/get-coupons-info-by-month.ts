import {Injectable} from "@nestjs/common";
import {CouponsService} from "src/features/coupons/data/remote/coupons.service";
import {CouponMonth} from "../models/coupons-month";

@Injectable()
export class GetCouponsInfoByMonthUseCase {
    constructor(private service: CouponsService) {}

    async execute(year: string, month: string): Promise<CouponMonth> {
        return this.service.getCouponsByMonth(year, month)
    }
}