import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const appRouter = trpc.router<Context>()
  .query('hello', {
    input: z.string().nullish(),
    resolve(req) {
      console.log("At endpoint hello:", JSON.stringify(req));
      return {
        greet: `hello ${ req.input ?? 'world' }`,
      };
    },
  });

export type AppRouter = typeof appRouter;
export default appRouter;
