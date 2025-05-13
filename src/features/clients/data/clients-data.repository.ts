import { Injectable, Logger } from '@nestjs/common';
import { ClientsService, ClientProductDateQueryResult } from './database/clients.service';
import { IClientsRepository } from '../domain/interfaces/iclients.repository';
import { ClientModel } from '../domain/models/client.model';
import { ProductClientDistributionWithDateModel } from '../domain/models/product-client-distribution-with-date.model';

@Injectable()
export class ClientsDataRepository implements IClientsRepository {
  private readonly logger = new Logger(ClientsDataRepository.name);

  constructor(private clientsService: ClientsService) {}
  async getAllClients(): Promise<ClientModel[]> {
    try {
      const clients = await this.clientsService.getAllClients();
      
      // Mapear de la entidad Client al modelo ClientModel
      return clients.map(client => ({
        email: client.email,
        nombre: client.nombre,
        edad: client.edad,
        sexo: client.sexo,
        cp: client.cp,
        localidad: client.localidad,
        pais: client.pais,
        fechaLead: client.fechaLead,
        fechaPrimerPedido: client.fechaPrimerPedido,
        periodoConversion: client.periodoConversion,
        fechaUltimoPedido: client.fechaUltimoPedido,
        tiempoLtv: client.tiempoLtv,
        entradaLead: client.entradaLead,
        numeroPedidos: client.numeroPedidos,
        ltv: client.ltv,
        tm: client.tm,
        periodoMedioCompra: client.periodoMedioCompra,
        periodoDesdeUltimoPedido: client.periodoDesdeUltimoPedido
      }));    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error in data repository getAllClients: ${errorMessage}`, errorStack);
      throw error;
    }
  }  async getClientsPerProductWithDateInfo(): Promise<ProductClientDistributionWithDateModel[]> {
    try {
      const data = await this.clientsService.getClientsPerProductWithDateInfo();
      
      // Agrupar por año-mes para calcular porcentajes dentro de cada período
      const groupedByYearMonth: Record<string, ProductClientDistributionWithDateModel[]> = {};
      
      // Los datos ya vienen con el tipado correcto desde el servicio, solo convertimos al modelo del dominio
      const typedData: ProductClientDistributionWithDateModel[] = data.map(item => ({
        name: item.name,
        value: item.value,
        yearMonth: item.yearMonth,
        year: item.year,
        month: item.month
      }));
      
      // Agrupamos por año-mes
      for (const item of typedData) {
        if (!groupedByYearMonth[item.yearMonth]) {
          groupedByYearMonth[item.yearMonth] = [];
        }
        groupedByYearMonth[item.yearMonth].push(item);
      }
      
      // Calcular porcentajes para cada grupo
      const result: ProductClientDistributionWithDateModel[] = [];
      
      for (const yearMonth in groupedByYearMonth) {
        const items = groupedByYearMonth[yearMonth];
        const totalForPeriod = items.reduce((sum, item) => sum + item.value, 0);
        
        for (const item of items) {
          result.push({
            ...item,
            percentage: totalForPeriod > 0 ? Math.round((item.value / totalForPeriod) * 100) : 0
          });
        }
      }
      
      return result;    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error in data repository getClientsPerProductWithDateInfo: ${errorMessage}`, errorStack);
      throw error;
    }
  }

  async getClientByEmail(email: string): Promise<ClientModel | null> {
    try {
      const client = await this.clientsService.getClientByEmail(email);
      
      if (!client) {
        return null;
      }
      
      // Mapear de la entidad Client al modelo ClientModel
      return {
        email: client.email,
        nombre: client.nombre,
        edad: client.edad,
        sexo: client.sexo,
        cp: client.cp,
        localidad: client.localidad,
        pais: client.pais,
        fechaLead: client.fechaLead,
        fechaPrimerPedido: client.fechaPrimerPedido,
        periodoConversion: client.periodoConversion,
        fechaUltimoPedido: client.fechaUltimoPedido,
        tiempoLtv: client.tiempoLtv,
        entradaLead: client.entradaLead,
        numeroPedidos: client.numeroPedidos,
        ltv: client.ltv,
        tm: client.tm,
        periodoMedioCompra: client.periodoMedioCompra,
        periodoDesdeUltimoPedido: client.periodoDesdeUltimoPedido
      };    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      this.logger.error(`Error in data repository getClientByEmail: ${errorMessage}`, errorStack);
      throw error;
    }
  }
}
