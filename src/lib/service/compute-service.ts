import trpcClient from './client';

export class ComputeService {
  public count(count: number): Promise<number> {
    return trpcClient.query('compute-count', count);
  }
}
