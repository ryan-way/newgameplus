import { Count } from '../../models';
import trpcClient from '../../trpc/client';

export class ComputeService {
  public count(count: number): Promise<number> {
    return trpcClient.query('compute-count', count);
  }
}
