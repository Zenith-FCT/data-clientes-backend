import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { Product, Order } from '../../../orders-invoices/data/entities/orders-invoices.entity';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}
  
  async getAllClients(): Promise<Client[]> {
    try {
      return await this.clientRepository.find();
    } catch (error) {
      this.logger.error(`Error fetching all clients: ${error.message}`, error.stack);
      throw error;
    }
  }
  
  findAll() {
    return `This action returns all clients`;
  }
  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  async getClientByEmail(email: string): Promise<Client | null> {
    try {
      return await this.clientRepository.findOne({ where: { email } });
    } catch (error) {
      this.logger.error(`Error fetching client by email: ${error.message}`, error.stack);
      throw error;
    }
  }
  remove(id: number) {
    return `This action removes a #${id} client`;
  }

  async getClientsPerProductWithDateInfo(): Promise<any[]> {
    try {
      // Esta consulta obtiene todos los pedidos con información de categoría y fecha
      const query = `
        SELECT 
          categoria_productos as name,
          COUNT(DISTINCT email) as value,
          DATE_FORMAT(fecha_pedido, '%Y-%m') as yearMonth,
          YEAR(fecha_pedido) as year,
          MONTH(fecha_pedido) as month
        FROM pedidos
        WHERE categoria_productos IS NOT NULL AND categoria_productos <> ''
        GROUP BY categoria_productos, yearMonth
        ORDER BY yearMonth DESC, value DESC
      `;
      
      const results = await this.orderRepository.query(query);
      
      if (!results || results.length === 0) {
        // Datos de muestra si no hay resultados
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        
        return [
          { name: 'Electrónica', value: 45, yearMonth: `${currentYear}-${currentMonth}`, year: currentYear, month: currentMonth },
          { name: 'Ropa', value: 32, yearMonth: `${currentYear}-${currentMonth}`, year: currentYear, month: currentMonth },
          { name: 'Hogar', value: 28, yearMonth: `${currentYear}-${currentMonth}`, year: currentYear, month: currentMonth },
          { name: 'Deportes', value: 15, yearMonth: `${currentYear}-${currentMonth-1}`, year: currentYear, month: currentMonth-1 },
          { name: 'Juguetes', value: 10, yearMonth: `${currentYear}-${currentMonth-1}`, year: currentYear, month: currentMonth-1 },
          // Datos de ejemplo para meses anteriores
          { name: 'Electrónica', value: 40, yearMonth: `${currentYear}-${currentMonth-2}`, year: currentYear, month: currentMonth-2 },
          { name: 'Ropa', value: 38, yearMonth: `${currentYear}-${currentMonth-2}`, year: currentYear, month: currentMonth-2 },
          { name: 'Hogar', value: 25, yearMonth: `${currentYear}-${currentMonth-2}`, year: currentYear, month: currentMonth-2 }
        ];
      }
      
      // Transforma los resultados para que sean más fáciles de usar en el frontend
      return results.map(item => ({
        name: item.name,
        value: parseInt(item.value) || 0,
        yearMonth: item.yearMonth,
        year: parseInt(item.year),
        month: parseInt(item.month)
      }));
    } catch (error) {
      this.logger.error(`Error getting clients per product with date info: ${error.message}`, error.stack);
      throw error;
    }
  }
}
