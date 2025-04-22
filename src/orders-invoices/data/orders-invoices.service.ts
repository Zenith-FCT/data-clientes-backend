import { Injectable } from '@nestjs/common';
import { CreateOrdersInvoicesDto } from '../presentation/dto/create-orders-invoices.dto';
import { UpdateOrdersInvoicesDto } from '../presentation/dto/update-orders-invoices.dto';
import { GetAllMonthlySalesUseCase} from '../domain/use-case/get-all-monthly-sales.use-case';
import { MonthlySalesModel } from '../domain/models/monthly-sales-model';

@Injectable()
export class OrdersInvoicesService{
    constructor(
        private readonly getAllMonthlySalesUseCase: GetAllMonthlySalesUseCase
    ) {}
    
   
    async getAllMonthlySales(): Promise<MonthlySalesModel[]> {
        return this.getAllMonthlySalesUseCase.execute();
    }
}
