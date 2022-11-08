import * as trpc from '@trpc/server';
import { z } from 'zod';

import { WindowService } from './window';

const service = new WindowService();
let countRes = null;
let count: number;
async function getCount(): Promise<number> {
  return await new Promise(res => {
    countRes = res;
  });
}

function setCount(count: number) {
  countRes(count);
}

const router = trpc
  .router()
  .query('count', {
    input: z.number(),
    async resolve({ input }) {
      console.log('COMPUTER_COUNT');
      const processWin = service.getProcessWindow();
      count = input;
      return await getCount();
    },
  })
  .query('get-count', {
    async resolve() {
      console.log('COMPUTER_GET_COUNT');
      return count;
    },
  })
  .mutation('count', {
    input: z.number(),
    async resolve({ input }) {
      console.log('MUT_COMPUTE_GET_COUNT');
      setCount(input);
    },
  });

export { router };
