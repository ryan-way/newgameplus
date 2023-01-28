import * as trpc from '@trpc/server';
import { z } from 'zod';

import { ComputeWindow } from '../window';

let job: 'count';

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
      job = 'count';
      count = input;
      const window = new ComputeWindow();
      window.Ready();
      return await getCount().then(res => {
        window.destroy();
        return res;
      });
    },
  })
  .query('job', {
    async resolve() {
      return job;
    },
  })
  .query('count-job', {
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
