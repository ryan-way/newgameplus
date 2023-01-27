import * as trpc from '@trpc/server';
import { z } from 'zod';

import logger from '../logger';

const router = trpc
  .router()
  .mutation('info', {
    input: z.string(),
    async resolve({ input }) {
      return logger.info(input);
    },
  })
  .mutation('error', {
    input: z.string(),
    async resolve({ input }) {
      return logger.error(input);
    },
  })
  .mutation('metric', {
    input: z.object({
      category: z.string(),
      operation: z.string(),
      params: z.string(),
      measurement: z.number(),
    }),
    async resolve({ input }) {
      return logger.metric(input.category, input.operation, input.params, input.measurement);
    },
  });

export { router };
