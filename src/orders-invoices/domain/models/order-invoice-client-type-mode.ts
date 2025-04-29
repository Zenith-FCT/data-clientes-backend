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