import trpcClient from '../trpc/client';
import { logService } from '../lib/service';

async function main() {
  let count: number = await trpcClient.query('compute-get-count');
  const start = new Date().getTime();
  count += 1;
  const end = new Date().getTime();
  logService.metric('Counting', 'Increment', `${count}`, end - start);
  trpcClient.mutation('compute-count', count);
}
main();
