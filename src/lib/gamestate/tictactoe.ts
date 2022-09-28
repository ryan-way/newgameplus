export type Cell = ' ' | 'O' | 'X';
export type Row = [Cell, Cell, Cell];
export type Board = [Row, Row, Row];
export type GameState = 'playing' | 'gameover';
export type Winner = 1 | 2 | undefined;
export type Move = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class TicTacToe {

  private currentToken: Cell = 'X';
  private gameOver: boolean = false;
  private winner: Winner = undefined;

  constructor(
    private board: Board
  ) {
  }

  public get Board(): Board {
    return JSON.parse(JSON.stringify(this.board));
  }

  public Move(move: Move) {
    let rowIdx = Math.floor(move/3);
    let cellIdx = move % 3;
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

  public get Winner(): Winner {
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
