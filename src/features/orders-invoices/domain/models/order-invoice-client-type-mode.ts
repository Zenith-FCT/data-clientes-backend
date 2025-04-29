export class InvoiceClientsTypeModel {
    constructor(
        public id: string,
        public date: string,
        public totalRecurent: string,
        public totalUnique: string,
        public totalRecurrentOrders: string,
        public totalUniqueOrders: string
    ) {}
}

export class OrderInvoiceClientTypeModel {
  id: string;
  year: string;
  clientType: string;
  totalAmount: string;
  count: string;
  
  constructor(id: string, year: string, clientType: string, totalAmount: string, count: string) {
    this.id = id;
    this.year = year;
    this.clientType = clientType;
    this.totalAmount = totalAmount;
    this.count = count;
  }
}