import { BaseDb } from './base-db';
import type { LogEntry } from '../models';

export class LogDb extends BaseDb<LogEntry> {
  constructor() {
    const client = BaseDb.getClient();
    super(client.logEntry);
  }
}
