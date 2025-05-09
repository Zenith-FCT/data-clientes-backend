import {Injectable} from "@nestjs/common";
import {CouponsService} from "src/features/coupons/data/remote/coupons.service";


@Injectable()
export class GetTotalDiscountCouponsUseCase {
    constructor(private service: CouponsService) {}

    async execute(): Promise<number> {
        return this.service.getTotalDiscount()
    }
}