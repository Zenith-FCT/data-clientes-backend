import { ClientModel } from '../models/client.model';

export const CLIENTS_REPOSITORY = 'CLIENTS_REPOSITORY';

export interface IClientsRepository {
  getAllClients(): Promise<ClientModel[]>;
  // Aquí puedes añadir más métodos según necesites
}
