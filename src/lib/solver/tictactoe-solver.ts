import { SolverService } from '$lib/solver/solver-service';
import type { Board, Move } from '$lib/gamestate/tictactoe';

export class TicTacToeSolver extends SolverService implements ITicTacToeSolver {
  constructor() {
    super('tictactoe');
  }

  async getBestMove(board: Board): Promise<Move> {
    return this.query({ board: board }).then(res => {
      return res as Move;
    });
  }
}

export interface ITicTacToeSolver {
  getBestMove(board: Board): Promise<Move>;
}
