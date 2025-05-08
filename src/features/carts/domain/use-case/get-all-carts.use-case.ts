import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartsEntity } from "../../data/entities/carts.entity";
import { CartModel } from "../models/carts-models";

// Definir un tipo seguro para los resultados
type CartCountResult = {
  total: string;
  date: string;
};

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
    
    const typedResults: CartCountResult[] = queryResult.map(row => ({
      total: String(row.total),
      date: String(row.date)
    }));
    
    return typedResults.map(item => 
      new CartModel(
        `monthly-${item.date}`,
        item.date,
        item.total
      )
    );
  }
}