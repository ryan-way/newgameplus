import * as trpc from '@trpc/server';
import { Board, Move } from '$lib/gamestate/tictactoe';
import { z } from 'zod';
import path from 'path';

type Context = {};

const appRouter = trpc.router<Context>()
  .query('tictactoe', {
    input: z.object({
      board: z.array(z.array(z.enum([' ', 'O', 'X'])))
    }),
    async resolve(req) {
      return req.input.board.flat().findIndex(cell => cell == ' ') as Move;
    },
  })

export type AppRouter = typeof appRouter;
export default appRouter;
