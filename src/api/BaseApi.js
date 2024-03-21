import axios from "axios";
import {BASE_URL} from "../consts/api";

export default class BaseApi {
    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async get(url) {
        try {
            const response = await this.api.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async post(url, data) {
        try {
            const response = await this.api.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async put(url, data) {
        try {
            const response = await this.api.put(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(url) {
        try {
            const response = await this.api.delete(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
