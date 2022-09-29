import type { AppRouter } from '$lib/solver/router';
import { createTRPCClient } from '@trpc/client';

export class SolverService<Params, Response> {
  private trpcClient;

  constructor(readonly queryKey: string) {
    this.trpcClient = createTRPCClient<AppRouter>({
      url: 'http://localhost:3000/trpc'
    });
  }

  query(params: Params): Promise<Response> {
    return this.trpcClient.query(this.queryKey, params);
  }
}
