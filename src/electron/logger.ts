import { LogEntry, Metric } from '../models';
import { LogDb, MetricDb } from '../db';
import * as uuid from 'uuid';

export class Logger {
  logDb = new LogDb();
  metricDb = new MetricDb();

  static session = uuid.v1();

  private logEntry(entry: LogEntry) {
    console.log(entry.dateTime, entry.level, entry.message);
  }

  private logMetric(metric: Metric) {
    console.log(metric.dateTime, 'METRIC', metric.category, metric.params, metric.measurement);
  }

  private log(level: string, message: string) {
    const entry: LogEntry = {
      session: Logger.session,
      dateTime: new Date(),
      level: level,
      message: message,
    };

    this.logEntry(entry);
    this.logDb.create(entry);
  }

  info(message: string) {
    this.log('INFO', message);
  }

  error(message: string) {
    this.log('ERROR', message);
  }

  metric(category: string, operation: string, params: string, measurment: number) {
    const metric: Metric = {
      session: Logger.session,
      dateTime: new Date(),
      category: category,
      operation: operation,
      params: params,
      measurement: measurment,
    };

    this.logMetric(metric);
    this.metricDb.create(metric);
  }
}

const logger = new Logger();
export default logger;
