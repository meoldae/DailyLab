import axios from "axios";

const HttpJson = axios.create({
    baseURL : import.meta.env.VITE_APP_SERVER as string,
    timeout : 10000000,
    headers : {
        'Content-Type' : 'application/json',
    }
});

const HttpForm = axios.create({
    baseURL : import.meta.env.VITE_APP_SERVER as string,
    timeout : 10000,
    headers : {
        'Content-Type' : 'multipart/form-data',
    }
});

export { HttpJson, HttpForm };