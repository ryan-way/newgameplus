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
      const processWin = service.getProcessWindow();
      count = input;
      return await getCount().then(res => {
        service.closeWindow(processWin);
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
