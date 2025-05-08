import { Injectable } from "@nestjs/common";
import { GetAllCartsUseCase } from "../domain/use-case/get-all-carts.use-case";

@Injectable()
export class CartsService {
    constructor(
        private readonly getAllCartsUseCase: GetAllCartsUseCase
    ) {}

    async getAllCarts(): Promise<any[]> {
        return this.getAllCartsUseCase.execute();
    }

}