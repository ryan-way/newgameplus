import trpcClient from '../trpc/client';

async function main() {
  const count: number = await trpcClient.query('compute-get-count');
  trpcClient.mutation('compute-count', count + 1);
}
main();
