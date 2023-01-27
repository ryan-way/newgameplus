import type { AppRouter } from '../../electron/router/renderer';
import { ipcLink } from '../../electron/router/renderer';
import { createTRPCClient } from '@trpc/client';

const trpcClient = createTRPCClient<AppRouter>({
  links: [ipcLink()],
});

export default trpcClient;
