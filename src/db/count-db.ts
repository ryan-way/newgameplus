import { BaseDb } from './base-db';
import { Count } from '../models';

export class CountDb extends BaseDb<Count> {
  constructor() {
    const client = BaseDb.getClient();
    super(client.count);
  }
}
