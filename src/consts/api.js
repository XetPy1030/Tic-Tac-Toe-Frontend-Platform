const HOST = process.env.BACKEND_HOST || "localhost:8000";

export const BASE_URL = `http://${HOST}/api`;
export const WS_URL = `ws://${HOST}/api`;
