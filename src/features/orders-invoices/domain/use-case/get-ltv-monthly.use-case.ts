import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../data/entities/orders-invoices.entity';
import { LtvModel } from '../models/ltv-model';

@Injectable()
export class GetLtvMonthlyUseCase {    
    constructor(
        @InjectRepository(Client)
        private clientsRepository: Repository<Client>
    ) {}    
    
    async execute(): Promise<LtvModel[]> {
        type YearlyLtvData = {
            year: string;
            totalLtv: string;
            clientCount: string;
        };
        
        const yearlyLtvData = await this.clientsRepository
            .createQueryBuilder('clientes')
            .select("YEAR(clientes.Fecha_1er_Pedido)", 'year')
            .addSelect('SUM(clientes.LTV)', 'totalLtv')
            .addSelect('COUNT(clientes.email)', 'clientCount')
            .where('clientes.Fecha_1er_Pedido IS NOT NULL')
            .groupBy('year')
            .orderBy('year', 'ASC')
            .getRawMany();
        
        let cumulativeLtv = 0;
        const ltvModels: LtvModel[] = [];
        
        yearlyLtvData.forEach((item: YearlyLtvData) => {
            const clientCount = item.clientCount ? parseInt(item.clientCount) : 0;
            const totalLtv = item.totalLtv ? parseFloat(item.totalLtv) : 0;
            const yearLtvAverage = clientCount > 0 
                ? totalLtv / clientCount 
                : 0;
            
            cumulativeLtv += yearLtvAverage;
            
            const year = item.year || '';
            const uniqueId = `ltv-${year}`;
            
            ltvModels.push(
                new LtvModel(
                    uniqueId,
                    parseInt(year),
                    parseFloat(cumulativeLtv.toFixed(2)),
                    clientCount
                )
            );
        });
        
        return ltvModels;
    }
}