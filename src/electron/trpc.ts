import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import path from 'path';

type Context = null;
const appRouter = trpc.router<Context>().query('count', {
  input: z.number(),
  async resolve(req) {
    console.log('At endpoint count:', req.input);
    return {
      num: req.input + 1,
    };
  },
});

export type AppRouter = typeof appRouter;
export default appRouter;
