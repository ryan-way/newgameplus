import trpcClient from '../trpc/client';

async function main() {
  console.log('Compute Main');
  console.log('fetching num...');
  const count: number = await trpcClient.query('compute-get-count');
  console.log('returning num...');
  trpcClient.mutation('compute-count', count + 1);
}
main();
