import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./BASE_URL";

export const apiRequester: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});