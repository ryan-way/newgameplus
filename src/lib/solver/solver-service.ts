import type { AppRouter } from '$lib/solver/router';
import { createTRPCClient } from '@trpc/client';

export class SolverService {
  private trpcClient;

  constructor(readonly queryKey: 'tictactoe') {
    this.trpcClient = createTRPCClient<AppRouter>({
      url: 'http://localhost:3000/trpc'
    });
  }

  query(params: any): Promise<any> {
    return this.trpcClient.query(this.queryKey, params);
  }
}
