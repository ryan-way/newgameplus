import * as trpc from '@trpc/server';
import { router as countRouter } from './count-router';
import { router as computeRouter } from './compute-router';
import { router as logRouter } from './log-router';

const router = trpc
  .router()
  .merge('count-', countRouter)
  .merge('compute-', computeRouter)
  .merge('log-', logRouter);

export { router as router };
export type AppRouter = typeof router;
