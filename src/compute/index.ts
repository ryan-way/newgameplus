import trpcClient from '../lib/service/client';
import { logService } from '../lib/service';

async function dispatchCount() {
  let count: number = await trpcClient.query('compute-count-job');
  const start = new Date().getTime();
  count += 1;
  const end = new Date().getTime();
  logService.metric('Counting', 'Increment', `${count}`, end - start);
  trpcClient.mutation('compute-count', count);
}

async function main() {
  const job = await trpcClient.query('compute-job');

  if (job == 'count') {
    dispatchCount();
  } else {
    logService.error(`COMPUTE: Unsupported job ${job}`);
  }
}
main();
