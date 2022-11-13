import trpcClient from '../../trpc/client';

export class LogService {
  public info(message: string) {
    trpcClient.mutation('log-info', message);
  }

  public error(message: string) {
    trpcClient.mutation('log-error', message);
  }

  public metric(category: string, operation: string, params: string, measurement: number) {
    trpcClient.mutation('log-metric', {
      category: category,
      operation: operation,
      params: params,
      measurement: measurement,
    });
  }
}
