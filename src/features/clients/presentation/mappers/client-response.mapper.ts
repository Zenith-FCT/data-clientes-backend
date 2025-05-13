import { Injectable } from '@nestjs/common';
import { ClientModel } from '../../domain/models/client.model';

/**
 * Mapper para transformar modelos de dominio en objetos de respuesta para la API
 */
@Injectable()
export class ClientResponseMapper {
  
  // Método auxiliar para formatear fechas
  private formatDate(date: Date | string | null | undefined): string {
    if (!date) return '';
      try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return '';
      
      return dateObj.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    } catch (_) {
      // Si hay un error en la conversión de fecha, retornamos una cadena vacía
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

  /**
   * Transforma un modelo de cliente en objeto de respuesta para la API
   */
  toResponse(client: ClientModel) {
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
  }

  /**
   * Transforma una lista de modelos de cliente en objetos de respuesta para la API
   */
  toResponseList(clients: ClientModel[]) {
    return clients.map(client => this.toResponse(client));
  }
}
