import * as trpc from '@trpc/server';
import { z } from 'zod';
import logger from '../logger';

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
      logger.info('Processing count job...');
      job = 'count';
      count = input;
      logger.info('Creating compute window...');
      const window = new ComputeWindow();
      window.Ready();
      return await getCount().then(res => {
        logger.info('Count computed');
        window.destroy();
        logger.info('Window destroyed; Job done');
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
