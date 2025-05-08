import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartsEntity } from "../../data/entities/carts.entity";
import { CartModel } from "../models/carts-models";

interface RawQueryResult {
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
    const queryResult = await this.cartsRepository.createQueryBuilder("cart")
      .select("CAST(COUNT(cart.id) AS CHAR)", "total")
      .addSelect("DATE_FORMAT(cart.fechaCarrito, '%Y-%m')", "date")
      .groupBy("DATE_FORMAT(cart.fechaCarrito, '%Y-%m')")
      .orderBy("date", "ASC")
      .getRawMany();
    
    return queryResult.map((row): CartModel => {
      if (typeof row !== 'object' || row === null) {
        throw new Error('Formato de resultado inválido');
      }
      
      const total = 'total' in row ? String(row.total) : '0';
      const date = 'date' in row ? String(row.date) : '';
      
      return new CartModel(
        `monthly-${date}`,
        date,
        total
      );
    });
  }
}