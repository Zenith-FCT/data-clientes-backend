import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartsEntity } from "../../data/entities/carts.entity";
import { CartModel } from "../models/carts-models";

interface QueryResult {
  total: string;
  date: string;
}

@Injectable()
export class GetAllCartsUseCase {
  constructor(
    @InjectRepository(CartsEntity)
    private cartsRepository: Repository<CartsEntity>
  ) {}

  async execute(): Promise<CartModel[]> {
    const rawResults = await this.cartsRepository.createQueryBuilder("cart")
      .select("CAST(COUNT(cart.id) AS CHAR)", "total")
      .addSelect("DATE_FORMAT(cart.fechaCarrito, '%Y-%m')", "date")
      .groupBy("DATE_FORMAT(cart.fechaCarrito, '%Y-%m')")
      .orderBy("date", "ASC")
      .getRawMany();
    
    return rawResults
      .filter((row): row is Record<string, unknown> => 
        row !== null && typeof row === 'object'
      )
      .map(row => {
        const result: QueryResult = {
          total: '',
          date: ''
        };
        
        if ('total' in row && (typeof row.total === 'string' || typeof row.total === 'number')) {
          result.total = String(row.total);
        }
        
        if ('date' in row && (typeof row.date === 'string')) {
          result.date = row.date;
        }
        
        return new CartModel(
          `monthly-${result.date}`, 
          result.date, 
          result.total
        );
      });
  }
}