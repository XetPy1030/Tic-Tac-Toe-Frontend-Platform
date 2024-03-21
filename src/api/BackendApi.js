import BaseApi from "./BaseApi";

class BackendApi extends BaseApi {
    async createGame() {
        return await this.post("/create");
    }
}

const backendApi = new BackendApi();
export default backendApi;
