export class LtvModel {
  month: string;
  year: number;
  ltv: number;
  clientCount: number;
  
  constructor(month: string, year: number, ltv: number, clientCount: number) {
    this.month = month;
    this.year = year;
    this.ltv = ltv;
    this.clientCount = clientCount;
  }
}