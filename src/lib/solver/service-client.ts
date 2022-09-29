import type { AppRouter } from '$lib/ai/router';
import { createTRPCClient } from '@trpc/client';

export class AiServiceClient<Params, Response> {
  private trpcClient;

  contructor() {
    this.trpcClient = createTRPCClient<AppRouter>({
      url: 'http://localhost:3000/trpc'
    });
  }

  query(key: string, params: Params): Promise<Response> {
    return this.trpcClient.query(key, params);
  }
}
