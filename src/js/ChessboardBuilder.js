import { Chessboard } from "./Chessboard.js";
import { Chess } from "chess.js";
import store from "../store/index.js";

export class ChessBoardBuilder {
    #chessboard = null
    #team = null
    #chess = null
    #updateFunction = null

    constructor(chess, team = "default", update = null) {
        this.#team = team
        this.#chess = chess
        this.#updateFunction = update
        window.addEventListener('piece-selected', this.handlePieceSelected);
    }

    createChessBoard(chessBoardDOM, eventListener, team = "default") {
        this.#chessboard = new Chessboard()
        this.#chessboard.assign(chessBoardDOM)
        this.#team = team;
        if (this.#team === 'b') {
            this.#chessboard.createChessboard(true)
        }
        else {
            this.#chessboard.createChessboard(false)
        }
        this.#chessboard.highlightFunction = (field) => {
            return this.#chess.moves({ verbose: true, square: field })
        }
        this.#chessboard.isAttackedFunction = () => {
            return this.#chess.isCheck()
        }
        this.#chessboard.getKingFunction = () => {
            return this.#getPositionsOfPiece({ type: 'k', color: this.#chess.turn() })
        }
        this.#chessboard.updateFunction = field => {
            return this.#chess.get(field)
        }
        this.#chessboard.isSelectable = field => {
            if (this.#team === 'w') {
                return this.#chess.get(field.id).color === 'w' && this.#chess.turn() === 'w'
            }
            if (this.#team === 'b') {
                return this.#chess.get(field.id).color === 'b' && this.#chess.turn() === 'b'
            }
            return this.#chess.get(field.id).color === this.#chess.turn()
        }
        this.#chessboard.asciiMove = this.#serialMoveFunction
        this.#chessboard.moveFunction = this.#asyncMoveFunction
        this.#chessboard.update()
        if (eventListener) {
            this.#chessboard.initializeEventListener()
        }
        this.#chessboard.newGameFunction = this.#newGame
        return this.#chessboard
    }

    #asyncMoveFunction = (move) => {
        if (this.#isPromotion(move)) {
            const customEvent = new CustomEvent('show-promotion-select', { detail: { move } });
            window.dispatchEvent(customEvent);
        } else {
            this.#serialMoveFunction(move, null);
        }
    }

    handlePieceSelected = (event) => {
        const selectedPiece = event.detail.pieceID;
        const move = event.detail.move;
        this.#serialMoveFunction(move, selectedPiece, false);
    }

    #doPromotion(move) {
        let result = this.#isPromotion(move)
        if (!result) return false
    }
    
    #getStartRow = () => {return this.#chess.turn() === this.#WHITE ? '7' : '2'}
    #getTargetRow = () => {return this.#chess.turn() === this.#WHITE ? '8' : '1'}
    #WHITE = 'w'

    #isPromotion(move) {
        if (move.substring(1, 2) !== this.#getStartRow()) return false
        if (move.substring(3, 4) !== this.#getTargetRow()) return false
        if (this.#chess.get(move.substring(-1, 2)).type !== 'p') return false
        return this.#chess
            .moves({ verbose: true, square: move.substring(-1, 2) })
            .map(field => field.to)
            .includes(move.substring(2, 4))
    }

    #pieces = [
        { name: 'queen', abbreviation: 'q' },
        { name: 'rook', abbreviation: 'r' },
        { name: 'bishop', abbreviation: 'b' },
        { name: 'knight', abbreviation: 'n' }
    ]


    #serialMoveFunction = (move, promotion, update = true) => {
        try {
            let isHit = this.#chess.get(move.substring(2, 4)) !== false
            if (promotion) {
                this.#chess.move({
                    from: move.substring(0, 2),
                    to: move.substring(2, 4),
                    promotion: promotion
                })
            } else {
                this.#chess.move({
                    from: move.substring(0, 2),
                    to: move.substring(2, 4)
                })
            }
            this.#chessboard.update()
            if (this.#checkIfGameIsOver()) {
                // this.#playSound(false, true)
            }
            else {
                // this.#playSound(isHit, false)
            }
            if (update) {
                this.#updateFunction(move)
            }
        } catch (exception) {
            this.#chessboard.handleException(move)
        }
    }

    #playSound = (isHit, gameOver) => {
        if (gameOver) {
            this.#sounds.notification.play()
        } else if (isHit) {
            this.#sounds.capture.play()
        } else {
            this.#sounds.move.play()
        }
    }

    #sounds = {
        move: document.getElementById("moveSound"),
        capture: document.getElementById("captureSound"),
        notification: document.getElementById("notificationSound")
    };

    #checkIfGameIsOver = () => {
        if (this.#chess.isThreefoldRepetition()) {
            this.gameOver("")
            return true
        }
        if (this.#chess.isInsufficientMaterial()) {
            this.gameOver("")
            return true
        }
        if (this.#chess.isGameOver()) {
            this.gameOver("")
            return true
        }
        return false
    }

    gameOver = (text) => {
        this.#chessboard.removeEventListener()
        this.#sounds.notification.play()
    }

    #getPositionsOfPiece = (piece) => {
        const positions = [];
        const board = this.#chess.board();
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = board[row][col];
                if (square && square.type === piece.type && square.color === piece.color) {
                    positions.push(String.fromCharCode('a'.charCodeAt(0) + col) + (8 - row));
                }
            }
        }
        return positions;
    }

    #newGame = () => {
        this.#chess.reset()
        this.#chessboard.update()
        this.#chessboard.initializeEventListener()
    }

    destroy() {
        window.removeEventListener('piece-selected', this.handlePieceSelected);
    }
}