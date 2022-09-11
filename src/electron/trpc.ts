import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import path from 'path';

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const appRouter = trpc.router<Context>()
  .query('count', {
    input: z.number(),
    async resolve(req) {
      console.log("At endpoint count:", req.input);
      return {
        num: req.input + 1
      };
    },
  });

export type AppRouter = typeof appRouter;
export default appRouter;
