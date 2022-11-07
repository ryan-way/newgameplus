import * as trpc from '@trpc/server';
import { router as countRouter } from './count-router';

const router = trpc.router().merge('count-', countRouter);

export { router as router };
export type AppRouter = typeof countRouter;
