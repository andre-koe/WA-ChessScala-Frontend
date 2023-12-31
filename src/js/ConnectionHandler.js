import $ from 'jquery'

export class ConnectionHandler
{
    socket;
    message_stack = [];
    updateFunction;
    chatMessageHandler;
    websocket_url = process.env.VUE_APP_WS_API_URL;
    http_url = process.env.VUE_APP_HTTP_API_URL;

    constructor(updateFunction, chatMessageHandler) {
        this.updateFunction = updateFunction
        this.chatMessageHandler = chatMessageHandler
    }

    sendMove(playerID, move, fen) {
        this.socket.send(JSON.stringify({"type": "move", "PlayerID": playerID, "UCI": move, "FEN": fen}))
    }

    async requestPlayerId() {
        const result = await $.get(this.http_url + "/online_multiplayer/new_game")
        return {
            playerId: result.PlayerID,
            gameId: result.GameID,
            color: 'w'
        };
    }

    onmessage(message) {
        switch (message.type){
            case "UCI":
                this.updateFunction(message.UCI)
                break
            case "message":
                this.message_stack.push({player: "opponent", message: message.message})
                this.chatMessageHandler()
                break
            case "timeout":
                break
        }
    }

    async connectToWebSocket(playerID) {
        this.socket = new WebSocket(this.websocket_url);

        try {
            await this.waitForSocketOpen(this.socket);

            this.socket.send(JSON.stringify({type: "register", "PlayerID": playerID}));
            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.onmessage(data)
            };

            setInterval(() => {
                if (this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(JSON.stringify({ type: 'timeout' }));
                }
            }, 70000);

        } catch (error) {
        }
    }

    destroy() {
        this.socket.close();
    }

    async requestGameSession(){
        return await $.post(this.http_url + "/online_multiplayer/join_game", {PlayerID: playerID})
    }


    sendMessage(playerID, message) {
        this.socket.send(JSON.stringify({"type": "message", "PlayerID": playerID, "message": message}))
        this.message_stack.push({player: "you", message: message})
        this.chatMessageHandler()
    }

    waitForSocketOpen(socket, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error('WebSocket opening timeout exceeded'));
            }, timeout);

            socket.onopen = () => {
                clearTimeout(timer);
                resolve();
            };

            socket.onerror = (err) => {
                clearTimeout(timer);
                reject(err);
            };
        });
    }
}