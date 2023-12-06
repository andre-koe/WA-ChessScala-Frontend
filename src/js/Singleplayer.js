import { Chess } from "chess.js";
import { ChessBoardBuilder } from './ChessboardBuilder'

export class SinglePlayer {
    constructor(team = "default") {
        this.chess = new Chess();
        this.stockfish = new Worker(new URL('./stockfish.js', import.meta.url));
        this.team = team;
        this.chessBoardBuilder = new ChessBoardBuilder(this.chess, team, this.update.bind(this));
        this.chessBoard = this.chessBoardBuilder.createChessBoard(document.querySelector("#Chessboard"), true, team);
        if (this.team == 'b') {
            setTimeout(this.doAIMove.bind(this), 1500)
        }
    }

    update() {
        if (this.chess.turn() !== this.team)
            setTimeout(this.doAIMove.bind(this), 1500);
    }

    doAIMove() {
        this.stockfish.postMessage('position fen ' + this.chess.fen());
        this.stockfish.postMessage("setoption name Skill Level value 1");
        this.stockfish.postMessage("go movetime 50");

        this.stockfish.onmessage = (event) => {
            let message = event.data || event.data.data;
            if (message.includes('bestmove')) {
                let move = message.split(' ')[1];
                if (move.length === 4) {
                    this.chessBoard.asciiMove(move.substring(0, 4));
                } else {
                    this.chessBoard.asciiMove(move.substring(0, 4), move.substring(4, 5));
                }
            }
        };
    }
}
