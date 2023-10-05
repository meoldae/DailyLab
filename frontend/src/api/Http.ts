import axios from "axios";
import { onErrorRequest, onRequest } from "./Interceptor";

const HttpJson = axios.create({
    baseURL : import.meta.env.VITE_DEV_API as string,
    timeout : 10000000,
    headers : {'Content-Type' : 'application/json',}
});

HttpJson.interceptors.request.use(onRequest, onErrorRequest);

const HttpForm = axios.create({
    baseURL : import.meta.env.VITE_DEV_API as string,
    timeout : 10000,
    headers : {'Content-Type' : 'multipart/form-data'}
});

HttpForm.interceptors.request.use(onRequest, onErrorRequest);

export { HttpJson, HttpForm };