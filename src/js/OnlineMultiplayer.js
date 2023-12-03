import { ConnectionHandler } from "./ConnectionHandler.js";
import { Chess } from "chess.js";
import { Chessboard } from "./Chessboard.js";
import { ChessBoardBuilder } from "./ChessboardBuilder.js";

export class OnlineMultiplayer {
    constructor(playerID = null, gameID = null, vue_store) {
        this.connectionHandler = new ConnectionHandler(this.proofMove.bind(this), this.handleIncomingChatMessage.bind(this));
        this.chess = new Chess();
        this.chessBoard = null;
        this.color = null;
        this.playerID = playerID;
        this.gameID = gameID;
        this.vue_store = vue_store;

        if (this.playerID && this.gameID) {
            this.use_existing_game();
        } else {
            this.start_new_game();
        }
    }

    async start_new_game() {
        const player_info = await this.connectionHandler.requestPlayerId();
        this.playerID = player_info.playerId;
        this.gameID = player_info.gameId;
        this.color = player_info.color;
        this.vue_store.commit("setPlayerId", this.playerID)
        this.vue_store.commit("setGameId", this.gameID)
        this.vue_store.commit("setMultiplayerTeam", this.color)
        await this.connectionHandler.connectToWebSocket(this.playerID);
        const chessboardBuilder = new ChessBoardBuilder(this.chess, 'w', this.update.bind(this));
        this.chessBoard = chessboardBuilder.createChessBoard(document.querySelector("#Chessboard"), true, 'w');
    }

    async use_existing_game() {
        const game_info = await this.connectionHandler.requestGameSession();
        this.playerID = this.vue_store.state.playerId
        this.gameID = this.vue_store.state.gameId
        this.color = this.vue_store.state.multiplayer_team
        if (game_info.Success === false) {
            await this.start_new_game();
            return;
        }
        this.chess.load(game_info.FEN);
        const chessboardBuilder = new ChessBoardBuilder(this.chess, this.color, this.update.bind(this));
        this.chessBoard = chessboardBuilder.createChessBoard(document.querySelector("#Chessboard"), true, this.color);
        await this.connectionHandler.connectToWebSocket(this.playerID);
    }

    update(move) {
        this.connectionHandler.sendMove(this.playerID, this.chess.history({ verbose: true }).pop().lan, this.chess.fen());
    }

    proofMove(move) {
        if (move.length === 4) {
            this.chessBoard.asciiMove(move.substring(0, 4), null, false);
        } else {
            this.chessBoard.asciiMove(move.substring(0, 4), move.substring(4, 5), false);
        }
    }

    handleIncomingChatMessage() {
        console.log(this.connectionHandler.message_stack);
    }

    copyGameID() {
        const path_for_invite_link = window.location.href + "/join_game/";
        this.fetchTranslation('gameID.copied').then(msg => {
            navigator.clipboard.writeText(path_for_invite_link + this.gameID).then(() => {
                alert(msg);
            });
        });
    }

    fetchTranslation(key) {
        return fetch('/api/getMessage/' + key)
            .then(response => response.text())
            .catch(error => {
                console.error('Error fetching translation:', error);
                return '';
            });
    }

    destroy() {
        this.connectionHandler.destroy();
    }
}