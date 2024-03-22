import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import gameStore, {WinStatus} from "../../stores/GameStore";
import webSocketStore from "../../stores/WebSocketStore";
import {observer} from "mobx-react";
import Map from "./Map";
import {init_keycloak} from "../../utils/keycloak";

const Game = () => {
    const {game_id, player_id} = useParams();

    useEffect(() => {
        if (game_id && !gameStore.game_id) {
            gameStore.setGameId(game_id);
        }
    }, [game_id]);

    useEffect(() => {
        if (player_id && !gameStore.player_id) {
            gameStore.setPlayerId(player_id);
        }
    }, [player_id]);


    useEffect(() => {
        if (gameStore.isGameJoin()) {
            return null;
        }

        console.log("Keycloak init")
        init_keycloak();
    }, []);

    useEffect(() => {
        if (gameStore.isGameJoin() && !webSocketStore.isWsConfigured) {
            webSocketStore.configureWs();
        }
    }, [gameStore.game_id, gameStore.player_id]); // eslint-disable-line

    return (<div>
        <h1>Game ID: {game_id}</h1>
        <h2>Player ID: {player_id}</h2>

        <h3>Your symbol: {gameStore.symbol}</h3>

        <h3>Map:</h3>
        <Map/>

        {gameStore.winStatus !== WinStatus.unknown && (<h3>You {gameStore.winStatus}!</h3>)}
    </div>);
};

export default observer(Game);
