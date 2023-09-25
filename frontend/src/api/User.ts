import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const UpdateSignUp = async (param: object, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/signup`, JSON.stringify(param)).then(success).catch(fail);
}

const getStatus = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/status`).then(success).catch(fail);
}

const refreshToken = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`auth/refresh`).then(success).catch(fail);
}

export { UpdateSignUp, getStatus, refreshToken };