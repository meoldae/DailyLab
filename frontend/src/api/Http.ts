import axios, { AxiosInstance } from "axios";
import { onRequest, onErrorRequest, onResponse, onErrorResponse } from "./Interceptor";


const HttpJson:AxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_DEV_API as string,
    timeout : 10000000,
    headers : {'Content-Type' : 'application/json'},
    withCredentials : true,
});

HttpJson.interceptors.request.use(onRequest, onErrorRequest);
HttpJson.interceptors.response.use(onResponse, onErrorResponse);

const HttpForm = axios.create({
    baseURL : import.meta.env.VITE_DEV_API as string,
    timeout : 10000,
    headers : {'Content-Type' : 'multipart/form-data'},
    withCredentials : true,
});

HttpForm.interceptors.request.use(onRequest, onErrorRequest);
HttpForm.interceptors.response.use(onResponse, onErrorResponse);

export { HttpJson, HttpForm };