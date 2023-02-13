import trpcClient from './client';

type Token = 'X' | 'O' | ' ';
type Row = [Token, Token, Token];
type Board = [Row, Row, Row];

export class ComputeService {
  public count(count: number): Promise<number> {
    return trpcClient.query('compute-count', count);
  }

  public tictactoe(board: Board) {
    return trpcClient.query('compute-tictactoe', board);
  }
}
