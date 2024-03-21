import {makeAutoObservable} from "mobx";
import gameStore from "./GameStore";
import {WS_URL} from "../consts/api";

class WsStore {
    #ws;
    static actions = {};

    constructor() {
        this.#ws = null;
    }

    configureWs() {
        if (gameStore.isGameJoin() && !this.#ws) {
            const {game_id, player_id} = gameStore;

            this.ws = new WebSocket(`${WS_URL}/connect/${game_id}/${player_id}`);
            this.ws.onopen = this.onOpen;
            this.ws.onmessage = this.onMessage;
            this.ws.onclose = this.onClose;
        } else {
            // throw new Error("Game is not joined yet!");
        }
    }

    onOpen() {
        console.log("WebSocket is opened!");
    }

    onMessage(event) {
        const data = JSON.parse(event.data);
        const {action, data: dataAction} = data;
        const actionFunc = WsStore.actions[action];

        if (actionFunc) {
            actionFunc(dataAction);
        } else {
            console.log(`Action ${action} is not defined!`);
        }
    }

    onClose() {
        console.log("WebSocket is closed!");
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
    }

    get isWsConfigured() {
        return this.#ws !== null;
    }

    get ws() {
        if (this.#ws === null) {
            throw new Error("WebSocket is not configured yet!");
        }
        return this.#ws;
    }

    set ws(ws) {
        if (this.#ws !== null) {
            throw new Error("WebSocket is already configured!");
        }
        this.#ws = ws;
    }
}

const wsStore = new WsStore();

class WebSocketStore {
    constructor() {
        this.wsStore = wsStore;

        WsStore.actions = {
            syncronize: this.onSyncronize,
            attack: this.onAttack,
            start_turn: this.onStartTurn,
            end_game: this.onEndGame,
        };

        makeAutoObservable(this);
    }

    onSyncronize(data) {
        console.log("Syncronize data:", data);
        gameStore.setMap(data.map);
        gameStore.setIsTurn(data.player.is_turn);
        gameStore.setWinStatus(data.player.win_status)
        gameStore.setSymbol(data.player.symbol);
    }

    onAttack(data) {
        console.log("Attack data:", data);
        const {coordinate, symbol} = data;
        gameStore.setMapCoordinate(coordinate, symbol);
        gameStore.setIsTurn(false);
    }

    onStartTurn(data) {
        console.log("Start turn data:", data);
        gameStore.setIsTurn(true);
    }

    onEndGame(data) {
        console.log("End game data:", data);
        gameStore.setWinStatus(data.win_status);
    }

    sendAttack(coordinate) {
        this.wsStore.send({
            action: "attack", data: {
                coordinate
            }
        });
    }

    configureWs() {
        this.wsStore.configureWs();
    }

    get isWsConfigured() {
        return this.wsStore.isWsConfigured;
    }
}

const webSocketStore = new WebSocketStore();
export default webSocketStore;
