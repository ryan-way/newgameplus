export type Cell = ' ' | 'O' | 'X';
export type Row = [Cell, Cell, Cell];
export type Board = [Row, Row, Row];
export type GameState = 'playing' | 'gameover';

export class TicTacToe {

  private currentToken: Cell = 'X';
  private gameOver: boolean = false;
  private winner: number | undefined = undefined;

  constructor(
    private board: Board
  ) {
  }

  public get Board(): Board {
    return JSON.parse(JSON.stringify(this.board));
  }

  public Move(rowIdx: number, cellIdx: number) {
    if (this.gameOver) return;
    if (this.board[rowIdx][cellIdx] !== ' ') return; 
    this.board[rowIdx][cellIdx] = this.currentToken;
    this.toggleCurrentToken();
    this.checkGameOver();
  }

  public Reset() {
    this.gameOver = false;
    this.board = [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']];
    this.currentToken = 'X';
  }

  public get Winner(): number | undefined {
    return this.winner;
  }

  public get GameOver(): boolean {
    return this.gameOver;
  }

  private toggleCurrentToken() {
    this.currentToken = this.currentToken == 'X' ? 'O' : 'X';
  }

  private checkGameOver() {
    for (let row of this.board) {
      if (row[0] !== ' ' && row.every(val => val === row[0])) {
        this.winner = row[0] == 'X'? 1 : 2;
        this.gameOver = true;
        return;
      }
    }

    for (let idx in this.board[0]) {
      if (this.board[0][idx] !== ' ' && this.board.every(row => row[idx] === this.board[0][idx])) {
        this.winner = this.board[0][idx] == 'X'? 1 : 2;
        this.gameOver = true;
        return;
      }
    }

    if (this.board[1][1] !== ' ') {
      if ((this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) ||
        this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) {
        this.winner = this.board[1][1] == 'X'? 1 : 2;
        this.gameOver = true;
        return;
      }
    }

  }

}
