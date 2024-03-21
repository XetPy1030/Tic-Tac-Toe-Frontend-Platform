const HOST = process.env.REACT_APP_BACKEND_HOST || "localhost:8000";

export const BASE_URL = `http://${HOST}/api`;
export const WS_URL = `ws://${HOST}/api`;
