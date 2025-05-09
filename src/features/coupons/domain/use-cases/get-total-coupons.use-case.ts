import {Injectable} from "@nestjs/common";
import {CouponsService} from "src/features/coupons/data/remote/coupons.service";
import {TotalCoupon} from "../models/total-coupon";


@Injectable()
export class GetTotalCouponsUseCase {
    constructor(private service: CouponsService) {}

    async execute(): Promise<TotalCoupon> {
        return this.service.getTotal()
    }
}