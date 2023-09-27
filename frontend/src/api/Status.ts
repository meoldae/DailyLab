import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

// 상태 proceed로 바꾸기
const setStatusProceed = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/start/${date}`).then(success).catch(fail);
}

// 상태 finish로 바꾸기
const setStatusFinish = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/end/${date}`).then(success).catch(fail);
}

export { setStatusProceed, setStatusFinish };