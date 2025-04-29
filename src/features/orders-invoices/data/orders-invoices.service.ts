import { Injectable } from '@nestjs/common';
import { MonthlySalesModel } from '../domain/models/monthly-sales-model';
import { GetAllMonthlySalesUseCase } from '../domain/use-case/get-all-monthly-sales.use-case';

@Injectable()
export class OrdersInvoicesService{
    constructor(
        private readonly getAllMonthlySalesUseCase: GetAllMonthlySalesUseCase
    ) {}
    
   
    async getAllMonthlySales(): Promise<MonthlySalesModel[]> {
        return this.getAllMonthlySalesUseCase.execute();
    }
} 
