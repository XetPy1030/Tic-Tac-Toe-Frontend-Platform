import {Button, CardLink, Container,} from 'react-bootstrap';
import backendApi from "../api/BackendApi";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

export const Launcher = () => {
    const [data, setData] = useState();

    const navigate = useNavigate();

    if (data) {
        const {game_id, players} = data;
        return (
            <div>
                <Container>
                    <h1>Game ID: {game_id}</h1>
                    <h2>Players:</h2>
                    <ul>
                        {players.map((player, index) => {
                            return (
                                <li key={index}>
                                    <a href={"/game/" + game_id + "/player/" + player.player_id}>
                                        {player.player_id}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <CardLink onClick={() => navigate("/")}>Back</CardLink>
                </Container>
            </div>
        );
    }

    // create game
    return (
        <div>
            <Container>
                <Button onClick={async () => {
                    const data = await backendApi.createGame();
                    setData(data);
                }}>Create Game</Button>
            </Container>
        </div>
    );
};