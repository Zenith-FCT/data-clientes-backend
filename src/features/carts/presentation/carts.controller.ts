import { Controller, Get, Injectable } from "@nestjs/common";
import { CartsService } from "../data/carts.service";
import { GetAllCartsUseCase } from "../domain/use-case/get-all-carts.use-case";

@Controller()
export class CartsController {
    constructor(
        private service: CartsService,
        private getAllCartsUseCase: GetAllCartsUseCase
    ) { }

    @Get('carts')
    async getAllCarts(): Promise<any[]> {
        return this.getAllCartsUseCase.execute();
    }
}