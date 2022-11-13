export interface LogEntry {
  id?: number;
  level: string;
  session: string;
  dateTime: Date;
  message: string;
}
