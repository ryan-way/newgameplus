import type { AppRouter } from './router';
import { ipcLink } from './link';
import { createTRPCClient } from '@trpc/client';

const trpcClient = createTRPCClient<AppRouter>({
  links: [ipcLink()],
});

export default trpcClient;
