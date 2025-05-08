import { Controller, Get } from "@nestjs/common";
import { CartsService } from "../data/carts.service";
import { GetAllCartsUseCase } from "../domain/use-case/get-all-carts.use-case";
import { GetTotalOrdersByMonthUseCase } from "../domain/use-case/get-total-orders-by-month.use-case";

@Controller()
export class CartsController {
    constructor(
        private service: CartsService,
        private getAllCartsUseCase: GetAllCartsUseCase,
        private getTotalOrdersUseCase: GetTotalOrdersByMonthUseCase
    ) { }

    @Get('carts')
    async getAllCarts(): Promise<any[]> {
        return this.getAllCartsUseCase.execute();
    }
    @Get('total_orders')
    async getTotalOrders(): Promise<any[]> {
        return this.getTotalOrdersUseCase.execute();
    }
}