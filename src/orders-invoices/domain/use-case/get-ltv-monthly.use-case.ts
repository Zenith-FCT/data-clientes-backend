import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../data/entities/orders-invoices.entity';
import { LtvModel } from '../models/ltv-model';

interface YearlyLtvData {
    year: string;
    totalLtv: string;
    clientCount: string;
}

@Injectable()
export class GetLtvMonthlyUseCase {    constructor(
        @InjectRepository(Client)
        private clientsRepository: Repository<Client>
    ) {}    
    async execute(): Promise<LtvModel[]> {
        const yearlyLtvData = await this.clientsRepository
            .createQueryBuilder('clientes')
            .select("YEAR(clientes.Fecha_1er_Pedido)", 'year')
            .addSelect('SUM(clientes.LTV)', 'totalLtv')
            .addSelect('COUNT(clientes.email)', 'clientCount')
            .where('clientes.Fecha_1er_Pedido IS NOT NULL')
            .groupBy('year')
            .orderBy('year', 'ASC')
            .getRawMany() as YearlyLtvData[];
        
        let cumulativeLtv = 0;
        const ltvModels: LtvModel[] = [];
        
        yearlyLtvData.forEach((item) => {
            const clientCount = parseInt(item.clientCount);
            const yearLtvAverage = clientCount > 0 
                ? parseFloat(item.totalLtv) / clientCount 
                : 0;
            
            cumulativeLtv += yearLtvAverage;
            
            const uniqueId = `ltv-${item.year}`;
            
            ltvModels.push(
                new LtvModel(
                    uniqueId,
                    item.year,
                    cumulativeLtv.toFixed(2)
                )
            );
        });
        
        return ltvModels;
    }
}
