import { MinimaxState } from './minimax-state';

export class MinimaxRunner<TMove> {
  constructor(private state: MinimaxState<TMove>, protected depth: number) {}

  Run(): TMove {
    let best_value = this.state.turn() ? -Infinity : Infinity;
    let best_move = this.state.moves()[0];
    for (const move of this.state.moves()) {
      this.state.move(move);
      const value = this.minimax(this.depth, this.state.turn());
      this.state.revert();
      if (this.state.turn() && value > best_value) {
        best_value = value;
        best_move = move;
      } else if (!this.state.turn() && value < best_value) {
        best_value = value;
        best_move = move;
      }
    }

    return best_move;
  }

  private minimax(depth: number, player: boolean): number {
    if (depth == 0 || this.state.done()) {
      const score = this.state.score() * depth;
      return score;
    }

    if (player) {
      let value = -Infinity;
      for (const move of this.state.moves()) {
        this.state.move(move);
        value = Math.max(value, this.minimax(depth - 1, !player));
        this.state.revert();
      }
      return value;
    } else {
      let value = Infinity;
      for (const move of this.state.moves()) {
        this.state.move(move);
        value = Math.min(value, this.minimax(depth - 1, !player));
        this.state.revert();
      }
      return value;
    }
  }
}
