import axios from "axios";
import { loadToken } from "./token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
    const token = loadToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
