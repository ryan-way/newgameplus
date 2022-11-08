import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from '../trpc/router';
import { ipcLink } from '../trpc/link';

const client = createTRPCClient<AppRouter>({
  links: [ipcLink()],
});

client.mutation('compute-count', 9);
