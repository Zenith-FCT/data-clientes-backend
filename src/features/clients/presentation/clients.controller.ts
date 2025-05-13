import { Controller, Get, Param, Delete, HttpException, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { ClientsService } from '../data/database/clients.service';
import { GetAllClientsUseCase } from '../domain/use-cases/get-all-clients.use-case';
import { GetClientsPerProductWithDateInfoUseCase } from '../domain/use-cases/get-clients-per-product-with-date-info.use-case';
import { GetClientByEmailUseCase } from '../domain/use-cases/get-client-by-email.use-case';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clientes')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly getAllClientsUseCase: GetAllClientsUseCase,
    private readonly getClientsPerProductWithDateInfoUseCase: GetClientsPerProductWithDateInfoUseCase,
    private readonly getClientByEmailUseCase: GetClientByEmailUseCase
  ) {}
  
  // Método auxiliar para formatear fechas
  private formatDate(date: Date | string | null | undefined): string {
    if (!date) return '';
    
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return '';
      
      return dateObj.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    } catch (e) {
      return '';
    }
  }
  
  // Método auxiliar para formatear números a string con 2 decimales
  private formatNumberToString(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    
    // Intentar convertir a número si es una cadena
    if (typeof value === 'string') {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        return num.toFixed(2);
      }
    }
    
    return String(value);
  }
  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Return all clients' })
  async getAllClients() {
    try {
      const clients = await this.getAllClientsUseCase.execute();
      
      return clients.map(client => {
        return {
          id: client.email || '',
          email: client.email || '',
          nombre: client.nombre || '',
          edad: client.edad ? String(client.edad) : '',
          sexo: client.sexo || '',
          cp: client.cp ? String(client.cp) : '',
          localidad: client.localidad || '',
          pais: client.pais || '',
          fecha_lead: this.formatDate(client.fechaLead),
          fecha_1er_pedido: this.formatDate(client.fechaPrimerPedido),
          periodo_conversión: client.periodoConversion ? String(client.periodoConversion) : '',
          fecha_ult_pedido: this.formatDate(client.fechaUltimoPedido),
          tiempo_ltv: client.tiempoLtv ? String(client.tiempoLtv) : '',
          entrada_lead: client.entradaLead || '',
          nº_pedidos: client.numeroPedidos ? String(client.numeroPedidos) : '',
          ltv: this.formatNumberToString(client.ltv),
          tm: this.formatNumberToString(client.tm),
          periodo_medio_compra: client.periodoMedioCompra ? String(client.periodoMedioCompra) : '',
          periodo_desde_ultimo_pedido: client.periodoDesdeUltimoPedido ? String(client.periodoDesdeUltimoPedido) : ''
        };
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Error fetching clients', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('clients-per-product')
  @ApiOperation({ summary: 'Get distribution of clients per product category with date information' })
  @ApiResponse({ status: 200, description: 'Return distribution of clients per product category with date information' })
  @ApiQuery({ name: 'year', required: false, description: 'Filter by year (YYYY)' })
  @ApiQuery({ name: 'month', required: false, description: 'Filter by month (1-12)' })
  async getClientsPerProductWithDate(
    @Query('year') year?: string,
    @Query('month') month?: string
  ) {
    try {
      // Obtenemos todos los datos con información de fecha
      const data = await this.getClientsPerProductWithDateInfoUseCase.execute();
      
      // Si no hay filtros, devolvemos todos los datos
      if (!year && !month) {
        return data;
      }
      
      // Convertimos los parámetros a números si existen
      let yearParam: number | undefined;
      let monthParam: number | undefined;
      
      if (year) {
        yearParam = parseInt(year);
        if (isNaN(yearParam)) {
          throw new HttpException('Year must be a valid number', HttpStatus.BAD_REQUEST);
        }
      }
      
      if (month) {
        monthParam = parseInt(month);
        if (isNaN(monthParam)) {
          throw new HttpException('Month must be a valid number between 1 and 12', HttpStatus.BAD_REQUEST);
        }
        
        // Validar que month esté en el rango 1-12
        if (monthParam < 1 || monthParam > 12) {
          throw new HttpException('Month must be between 1 and 12', HttpStatus.BAD_REQUEST);
        }
      }
      
      // Filtramos los datos según los parámetros
      return data.filter(item => {
        const yearMatch = !yearParam || item.year === yearParam;
        const monthMatch = !monthParam || item.month === monthParam;
        return yearMatch && monthMatch;
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error fetching clients per product distribution', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a client by email' })
  @ApiResponse({ status: 200, description: 'Return a client by email' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiParam({ name: 'id', description: 'Client email' })
  async findOne(@Param('id') id: string) {
    try {
      const client = await this.getClientByEmailUseCase.execute(id);
      
      return {
        id: client.email || '',
        email: client.email || '',
        nombre: client.nombre || '',
        edad: client.edad ? String(client.edad) : '',
        sexo: client.sexo || '',
        cp: client.cp ? String(client.cp) : '',
        localidad: client.localidad || '',
        pais: client.pais || '',
        fecha_lead: this.formatDate(client.fechaLead),
        fecha_1er_pedido: this.formatDate(client.fechaPrimerPedido),
        periodo_conversión: client.periodoConversion ? String(client.periodoConversion) : '',
        fecha_ult_pedido: this.formatDate(client.fechaUltimoPedido),
        tiempo_ltv: client.tiempoLtv ? String(client.tiempoLtv) : '',
        entrada_lead: client.entradaLead || '',
        nº_pedidos: client.numeroPedidos ? String(client.numeroPedidos) : '',
        ltv: this.formatNumberToString(client.ltv),
        tm: this.formatNumberToString(client.tm),
        periodo_medio_compra: client.periodoMedioCompra ? String(client.periodoMedioCompra) : '',
        periodo_desde_ultimo_pedido: client.periodoDesdeUltimoPedido ? String(client.periodoDesdeUltimoPedido) : ''
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        { message: `Error fetching client with email ${id}`, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
