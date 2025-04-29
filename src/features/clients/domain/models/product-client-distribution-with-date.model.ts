export interface ProductClientDistributionWithDateModel {
  name: string;            // Nombre de la categoría de producto
  value: number;           // Número de clientes únicos
  yearMonth: string;       // Formato YYYY-MM para facilitar el filtrado
  year: number;            // Año del pedido
  month: number;           // Mes del pedido (1-12)
  percentage?: number;     // Porcentaje opcional (puede calcularse en el frontend)
}
