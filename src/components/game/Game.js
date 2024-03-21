import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import gameStore, {WinStatus} from "../../stores/GameStore";
import webSocketStore from "../../stores/WebSocketStore";
import {observer} from "mobx-react";
import Map from "./Map";
import Keycloak from "keycloak-js";
import {KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_URL} from "../../consts/keycloak";

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
        const initOptions = {
            url: KEYCLOAK_URL,
            realm: KEYCLOAK_REALM,
            clientId: KEYCLOAK_CLIENT_ID,
            onLoad: "login-required",
        };
        const keycloak = new Keycloak(initOptions);
        keycloak.init({onLoad: "login-required"}).then(authenticated => {
            if (authenticated) {
                keycloak.loadUserInfo().then(userInfo => {
                    const {sub} = userInfo;
                    gameStore.setPlayerId(sub);
                });
            } else {
                keycloak.login(); // TODO: Redirect to login page
            }
        });
    }, []);

    useEffect(() => {
        if (gameStore.isGameJoin() && !webSocketStore.isWsConfigured) {
            webSocketStore.configureWs();
        }
    }, [gameStore.game_id, gameStore.player_id]);

    return (
        <div>
            <h1>Game ID: {game_id}</h1>
            <h2>Player ID: {player_id}</h2>

            <h3>Your symbol: {gameStore.symbol}</h3>

            <h3>Map:</h3>
            <Map />

            {gameStore.winStatus !== WinStatus.unknown && (
                <h3>You {gameStore.winStatus}!</h3>
            )}
        </div>
    );
};

export default observer(Game);
