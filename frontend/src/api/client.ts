
import axios from 'axios';
const baseURL = 'http://localhost:8080/api';
export const api = axios.create({ baseURL });
api.interceptors.request.use(async (config) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return config;
});