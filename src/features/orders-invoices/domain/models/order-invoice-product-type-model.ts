export class OrderInvoiceProductTypeModel {
  id: string;
  year: string;
  category: string;
  totalAmount: string;
  count: string;
  
  constructor(id: string, year: string, category: string, totalAmount: string, count: string) {
    this.id = id;
    this.year = year;
    this.category = category;
    this.totalAmount = totalAmount;
    this.count = count;
  }
}
