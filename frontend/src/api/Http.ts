import axios from "axios";
import { GetAccessToken } from "@/atom/UserAtom";

const HttpJson = axios.create({
    baseURL : import.meta.env.DEV_API as string,
    timeout : 10000000,
    headers : {
        'Content-Type' : 'application/json',
        'Authorization' :  "Bearer " + GetAccessToken
    }
});

const HttpForm = axios.create({
    baseURL : import.meta.env.DEV_API as string,
    timeout : 10000,
    headers : {
        'Content-Type' : 'multipart/form-data',
        'Authorization' :  "Bearer " + GetAccessToken
    }
});

export { HttpJson, HttpForm };