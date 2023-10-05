import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const CheckUserStatus =async (memberId: number, success: (data: {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/membership/${memberId}`).then(success).catch(fail);
}

const UpdateSignUp = async (param: object, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/signup`, JSON.stringify(param)).then(success).catch(fail);
}

const GetJoinDate = async (success: (data: {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/joinDate`).then(success).catch(fail);
}

const GetMyInfo = async (success: (data: {data: ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/mypage`).then(success).catch(fail);
}

const UpdateMyInfo = async (param: object, success: (data: {data: ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/modify`, JSON.stringify(param)).then(success).catch(fail);
}

const SubmitSecession = async (success: (data: {data: ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.delete(`member/exit`).then(success).catch(fail);
}

const getStatus = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/status`).then(success).catch(fail);
}

const UpdateLocation = async (param: object, success : () => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/weather/location`, JSON.stringify(param)).then(success).catch(fail);
}

const RefreshToken = async (success : (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`auth/refresh`).then(success).catch(fail);
}

export { CheckUserStatus, UpdateSignUp, GetJoinDate, GetMyInfo, UpdateMyInfo, SubmitSecession, getStatus, UpdateLocation, RefreshToken };