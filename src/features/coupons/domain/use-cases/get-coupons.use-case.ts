import {Injectable} from "@nestjs/common";
import {CouponsService} from "src/features/coupons/data/remote/coupons.service";
import {Coupon} from "../models/coupon";

@Injectable()
export class GetCouponsUseCase {
    constructor(private service: CouponsService) {}

    async execute(): Promise<Coupon[]> {
        return this.service.getCoupons()
    }
}