import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react";
import {Home} from "./components/Home";
import {Launcher} from "./components/Launcher";
import Game from "./components/game/Game";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/launcher" element={<Launcher/>}/>
                    <Route path="/game/:game_id/player/:player_id" element={<Game />}/>
                    <Route path="/game/:game_id" element={<Game />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default observer(App);
