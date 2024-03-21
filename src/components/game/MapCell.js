import {observer} from "mobx-react";

import gameStore, {WinStatus} from "../../stores/GameStore";
import webSocketStore from "../../stores/WebSocketStore";

const style = {
    display: "inline-block",
    width: "30px",
    height: "30px",
    border: "1px solid black",
    textAlign: "center",
    lineHeight: "30px",
    fontSize: "20px",
};

const MapCell = ({indexRow}) => {
    const cellValue = gameStore.map[indexRow];

    const attack = () => {
        if (!gameStore.isTurn || cellValue || gameStore.winStatus !== WinStatus.unknown) {
            return null;
        }
        webSocketStore.sendAttack(indexRow);
    }

    return (
        <span style={style} onClick={attack}>{cellValue ? cellValue : "#"}</span>
    )
}

export default observer(MapCell);