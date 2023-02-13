import trpcClient from '../lib/service/client';
import { logService } from '../lib/service';
import {
  SimpleTicTacToeBoardScorer,
  TicTacToeBoard,
  TicTacToeMinimaxRunner,
  TicTacToeMinimaxState,
} from './tictactoe';

async function dispatchCount() {
  let count: number = await trpcClient.query('compute-count-job');
  const start = new Date().getTime();
  count += 1;
  const end = new Date().getTime();
  logService.metric('Counting', 'Increment', `${count}`, end - start);
  trpcClient.mutation('compute-count', count);
}

async function dispatchTicTacToe() {
  const board: TicTacToeBoard = await trpcClient.query('compute-tictactoe-job');
  for (const row of board) {
    console.log(row);
  }
  const runner = new TicTacToeMinimaxRunner(board, 10);
  trpcClient.mutation('compute-tictactoe', runner.Run());
}

async function main() {
  console.log('Getting job');
  const job = await trpcClient.query('compute-job');

  if (job == 'count') {
    dispatchCount();
  } else if (job == 'tictactoe') {
    console.log('Tictactoe found');
    dispatchTicTacToe();
  } else {
    logService.error(`COMPUTE: Unsupported job ${job}`);
  }
}
main();
