import { BaseDb } from './base-db';
import type { Metric } from '../models';

export class MetricDb extends BaseDb<Metric> {
  constructor() {
    const client = BaseDb.getClient();
    super(client.metric);
  }
}
