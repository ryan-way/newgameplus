import * as trpc from '@trpc/server';
import { z } from 'zod';

import { ComputeWindow } from '../window';

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
      const window = new ComputeWindow();
      window.Ready();
      count = input;
      return await getCount().then(res => {
        window.destroy();
        return res;
      });
    },
  })
  .query('get-count', {
    async resolve() {
      return count;
    },
  })
  .mutation('count', {
    input: z.number(),
    async resolve({ input }) {
      setCount(input);
    },
  });

export { router };
