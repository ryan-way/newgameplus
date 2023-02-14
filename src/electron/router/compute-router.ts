import * as trpc from '@trpc/server';
import { z } from 'zod';
import logger from '../logger';

import { ComputeWindow } from '../window';

type Job = 'count' | 'tictactoe';

// General workflow for compute jobs:
// 1. Renderer process queries for job result
// 2. router setups up job type, and job parameters
// 3. router then initializes compute process, and awaits response
// 4. the compute process, upon initialization, requests the job type, then job parameters based on job
// 5. compute processes job, then sends response to router
// 6. await in router returns, router destroys compute process, then returns result
class Dispatcher<TInput, TReturn> {
  private window: ComputeWindow;
  private resolve: (value: TReturn) => void;

  constructor(private job: Job, private input: TInput) {}

  setUp() {
    this.window = new ComputeWindow();
  }

  async process(): Promise<TReturn> {
    this.window.Ready();
    return await this.getResponse().then((res: TReturn) => {
      this.window.destroy();
      return res;
    });
  }

  private async getResponse(): Promise<TReturn> {
    return await new Promise(res => {
      this.resolve = res;
    });
  }

  setResponse(value: TReturn) {
    this.resolve(value);
  }

  getJob(): Job {
    return this.job;
  }

  getInput(): TInput {
    return this.input;
  }
}

// better organization for schemas???
const tictactoeTokenSchema = z.union([z.literal(' '), z.literal('X'), z.literal('O')]);

const tictactoeRowSchema = z.tuple([
  tictactoeTokenSchema,
  tictactoeTokenSchema,
  tictactoeTokenSchema,
]);

const tictactoeSchema = z.tuple([tictactoeRowSchema, tictactoeRowSchema, tictactoeRowSchema]);

let dispatcher: Dispatcher;

const router = trpc
  .router()
  .query('job', {
    async resolve() {
      return dispatcher.getJob();
    },
  })
  .query('count', {
    input: z.number(),
    async resolve({ input }) {
      dispatcher = new Dispatcher<typeof input, number>('count', input);
      logger.info('Processing count job...');
      dispatcher.setUp();
      return await dispatcher.process();
    },
  })
  .query('count-job', {
    async resolve() {
      return dispatcher.getInput();
    },
  })
  .mutation('count', {
    input: z.number(),
    async resolve({ input }) {
      dispatcher.setResponse(input);
    },
  })
  .query('tictactoe', {
    input: tictactoeSchema,
    async resolve({ input }) {
      logger.info('Processing tictactoe job...');
      dispatcher = new Dispatcher<typeof input, number>('tictactoe', input);
      dispatcher.setUp();
      return await dispatcher.process();
    },
  })
  .query('tictactoe-job', {
    async resolve() {
      return dispatcher.getInput();
    },
  })
  .mutation('tictactoe', {
    input: z.number(),
    async resolve({ input }) {
      dispatcher.setResponse(input);
    },
  });

export { router };
