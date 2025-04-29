import { ClientModel } from '../models/client.model';
import { ProductClientDistributionWithDateModel } from '../models/product-client-distribution-with-date.model';

export const CLIENTS_REPOSITORY = 'CLIENTS_REPOSITORY';

export interface IClientsRepository {
  getAllClients(): Promise<ClientModel[]>;
  getClientsPerProductWithDateInfo(): Promise<ProductClientDistributionWithDateModel[]>;
  getClientByEmail(email: string): Promise<ClientModel | null>;
  // Aquí puedes añadir más métodos según necesites
}
