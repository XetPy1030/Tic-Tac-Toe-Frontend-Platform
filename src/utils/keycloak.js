import gameStore from "../stores/GameStore";
import {KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_URL} from "../consts/keycloak";
import Keycloak from "keycloak-js";


export function init_keycloak() {
    const initOptions = {
        url: KEYCLOAK_URL, realm: KEYCLOAK_REALM, clientId: KEYCLOAK_CLIENT_ID
    };
    const keycloak = new Keycloak(initOptions);
    keycloak.init(initOptions).then(authenticated => {
        if (authenticated) {
            loadInfo(keycloak)
        } else {
            keycloak.login().then(() => {
                loadInfo(keycloak);
            });
        }
    });
}


export function loadInfo(keycloak) {
    keycloak.loadUserInfo().then(userInfo => {
        console.log(userInfo)
        const {sub} = userInfo;
        gameStore.setPlayerId(sub);
    });
    gameStore.setToken(keycloak.token)
}
