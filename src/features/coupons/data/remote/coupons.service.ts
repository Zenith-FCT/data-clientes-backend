import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Coupon} from 'src/features/coupons/domain/models/coupon';
import {CouponMonth} from 'src/features/coupons/domain/models/coupons-month';
import {YearDataCoupon} from 'src/features/coupons/domain/models/year-coupon';
import {Repository} from 'typeorm';
import {TotalCoupon} from '../../domain/models/total-coupon';
import {OrdersCouponsEntity} from './entities/oders-coupons-invoices.entity';

@Injectable()
export class CouponsService {  

    @InjectRepository(OrdersCouponsEntity)
    private ordersRepository: Repository<OrdersCouponsEntity>

    async getCoupons(): Promise<Coupon[]> {
        const couponsData = await this.ordersRepository
            .createQueryBuilder('pedidos')
            .select("Nombre_cupon_descuento", "couponName")
            .addSelect('COUNT(*)', 'couponsCount')
            .where('Nombre_cupon_descuento IS NOT NULL')
            .groupBy("Nombre_cupon_descuento")
            .orderBy("couponsCount", "DESC")
            .getRawMany() as {couponName: string, couponsCount: number}[]

        return couponsData.map((data: {couponName: string, couponsCount: number}) => 
            new Coupon(data.couponName, data.couponsCount)
        )
    }

    async getAvailableYears(): Promise<YearDataCoupon[]> {
        return await this.ordersRepository
            .createQueryBuilder('pedidos')
            .select("Year(Fecha_Pedido)", "year")
            .groupBy("year")
            .orderBy("year", "DESC")
            .getRawMany() as YearDataCoupon[]
    }

    async getTotal(): Promise<TotalCoupon> {  
        const data = await this.ordersRepository
            .createQueryBuilder('pedidos')
            .select('Count(Nombre_cupon_descuento)', 'count')
            .where('Nombre_cupon_descuento IS NOT NULL')
            .getRawOne() as {count: number};

        return new TotalCoupon(data.count)
    }

    async getTotalDiscount(): Promise<TotalCoupon> {
        const data = await this.ordersRepository
            .createQueryBuilder('pedidos')
            .select('SUM(Total_descuento)', 'discount')
            .where('Nombre_cupon_descuento IS NOT NULL')
            .getRawOne() as {discount: number};

        return new TotalCoupon(data.discount)
    }

    async getCouponsByYear(year: string): Promise<CouponMonth[]> {
        const result = await this.ordersRepository
            .createQueryBuilder('pedidos')
            .select('MONTH(Fecha_Pedido)', 'month')
            .addSelect('COUNT(Nombre_cupon_descuento)', 'count')
            .addSelect('SUM(Total_descuento)', 'dicount')
            .where('YEAR(Fecha_Pedido) = :year', { year: year })
            .andWhere('Nombre_cupon_descuento IS NOT NULL')
            .groupBy('month')
            .orderBy('month')
            .getRawMany() as {count: string, dicount: string, month: number}[];

        return result.map((data: {count: string, dicount: string, month: number}) => 
            new CouponMonth(data.count, data.dicount, data.month)
        )

    }

    async getCouponsByMonth(year: string, month: string): Promise<CouponMonth> {
        const result = await this.ordersRepository
            .createQueryBuilder('pedidos')
            .select('COUNT(Nombre_cupon_descuento)', 'count')
            .addSelect('SUM(Total_descuento)', 'dicount')
            .where('YEAR(Fecha_Pedido) = :year', { year })
            .andWhere('MONTH(Fecha_Pedido) = :month', { month })
            .andWhere('Nombre_cupon_descuento IS NOT NULL')
            .getRawOne() as {count: string, dicount: string};

        return new CouponMonth(result.count, result.dicount, Number(month))
    }
}
