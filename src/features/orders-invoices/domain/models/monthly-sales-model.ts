export class MonthlySalesModel {
  month: string;
  year: number;
  totalSales: number;
  count: number;
  
  constructor(month: string, year: number, totalSales: number, count: number) {
    this.month = month;
    this.year = year;
    this.totalSales = totalSales;
    this.count = count;
  }
}