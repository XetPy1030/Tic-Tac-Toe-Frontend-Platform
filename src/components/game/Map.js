import gameStore, {WinStatus} from "../../stores/GameStore";
import {observer} from "mobx-react";
import MapCell from "./MapCell";

const Map = () => {
    if (!gameStore.map) {
        return (
            <h3>Map: Loading...</h3>
        )
    }

    const mapList = [];
    for (let i = 0; i < gameStore.map.length; i++) {
        if (i % 3 === 0) {
            mapList.push([]);
        }
        mapList[mapList.length - 1].push(gameStore.map[i]);
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "fit-content",
        }}>
            <div style={{
                backgroundColor: gameStore.isTurn && gameStore.winStatus === WinStatus.unknown ? "lightgreen" : "lightcoral",
                width: "fit-content",
            }}>
                {mapList.map((row, i) => (
                    <div key={i}>
                        {row.map((cell, j) => (
                            <MapCell key={j} indexRow={i * 3 + j} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default observer(Map);
