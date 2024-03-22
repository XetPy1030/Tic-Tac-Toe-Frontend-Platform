import {makeAutoObservable} from "mobx";

export const WinStatus = {
    'unknown': 'unknown',
    'draw': 'draw',
    'win': 'win',
    'lose': 'lose',
}

class GameStore {
    token;
    game_id;
    player_id;
    map;
    isTurn;
    winStatus;
    symbol;

    constructor() {
        this.token = null;
        this.game_id = null;
        this.player_id = null;
        this.map = null;
        this.isTurn = false;
        this.winStatus = null;
        this.symbol = null;

        makeAutoObservable(this);
    }

    setGameId(game_id) {
        this.game_id = game_id;
    }

    setPlayerId(player_id) {
        this.player_id = player_id;
    }

    isGameJoin() {
        return (this.game_id && this.player_id) || (this.game_id && this.token)
    }

    setMap(map) {
        this.map = map;
    }

    setIsTurn(isTurn) {
        this.isTurn = isTurn;
    }

    setMapCoordinate(coordinate, symbol) {
        this.map[coordinate] = symbol;
    }

    setWinStatus(winStatus) {
        this.winStatus = WinStatus[winStatus];
    }

    setSymbol(symbol) {
        this.symbol = symbol;
    }

    setToken(token) {
        this.token = token;
    }
}

const gameStore = new GameStore();
export default gameStore;
