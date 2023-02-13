export interface MinimaxState<TMove> {
  revert(): void;
  moves(): TMove[];
  score(): number;
  turn(): boolean;
  printBoard(): void;
  move(move: TMove): void;
  done(): boolean;
}
