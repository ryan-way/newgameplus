import { Count } from '../../models';
import trpcClient from './client';

export class CountService {
  public first(): Promise<Count> {
    return trpcClient.query('count-first');
  }

  public read(id: number): Promise<Count> {
    return trpcClient.query('count-read', id);
  }

  public readAll(): Promise<Count[]> {
    return trpcClient.query('count-read-all');
  }

  public update({ id, count }: { id: number; count: number }): Promise<Count> {
    return trpcClient.mutation('count-update', { id: id, count: count });
  }

  public create({ count }: { count: number }): Promise<Count> {
    return trpcClient.mutation('count-update', { count: count });
  }
}
