import {Injectable} from "@nestjs/common";
import {CouponsService} from "src/features/coupons/data/remote/coupons.service";
import {CouponMonth} from "../models/coupons-month";

@Injectable()
export class GetCouponsInfoByYearUseCase {
    constructor(private service: CouponsService) {}

    async execute(year: string): Promise<CouponMonth[]> {
        const data = await this.service.getCouponsByYear(year);

        const existing = new Map(data.map(item => [item.month, item]));
      
        const completed: CouponMonth[] = Array.from({ length: 12 }, (_, i) => {
          const month = i + 1;
          return existing.get(month) ?? new CouponMonth(
            "0",
            "0",
            month
          );
        });
      
        return completed; 
    }
}