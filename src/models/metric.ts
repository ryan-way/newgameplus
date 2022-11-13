export interface Metric {
  id?: number;
  session: string;
  dateTime: Date;
  category: string;
  operation: string;
  params: string;
  measurement: number;
}
