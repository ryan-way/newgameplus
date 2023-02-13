import * as trpc from '@trpc/server';
import { z } from 'zod';
import logger from '../logger';

import { ComputeWindow } from '../window';

let job: 'count' | 'tictactoe';

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

let tictactoeRes = null;
type token = 'X' | 'O' | ' ';
type row = [token, token, token];
let tictactoe: [row, row, row];
async function getTicTacToe(): Promise<number> {
  return await new Promise(res => {
    tictactoeRes = res;
  });
}

function setTicTacToe(tictactoe: number) {
  tictactoeRes(tictactoe);
}

const tictactoeTokenSchema = z.union([z.literal(' '), z.literal('X'), z.literal('O')]);

const tictactoeRowSchema = z.tuple([
  tictactoeTokenSchema,
  tictactoeTokenSchema,
  tictactoeTokenSchema,
]);

const tictactoeSchema = z.tuple([tictactoeRowSchema, tictactoeRowSchema, tictactoeRowSchema]);

const router = trpc
  .router()
  .query('job', {
    async resolve() {
      return job;
    },
  })
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
  })
  .query('tictactoe', {
    input: tictactoeSchema,
    async resolve({ input }) {
      logger.info('Processing tictactoe job...');
      job = 'tictactoe';
      tictactoe = input;
      logger.info('Creating compute window...');
      const window = new ComputeWindow();
      window.Ready();
      return await getTicTacToe().then(res => {
        logger.info('TicTacToe computed');
        window.destroy();
        logger.info('Window destroyed; Job done');
        return res;
      });
    },
  })
  .query('tictactoe-job', {
    async resolve() {
      return tictactoe;
    },
  })
  .mutation('tictactoe', {
    input: z.number(),
    async resolve({ input }) {
      setTicTacToe(input);
    },
  });

export { router };
