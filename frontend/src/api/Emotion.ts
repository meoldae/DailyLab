import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const getEmotionList =async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`/emotion`).then(success).catch(fail);
}

const getDailyData =async (param: object, success: (data : {data: ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`/emotion/date`, { params: param }).then(success).catch(fail);
}

export { getEmotionList, getDailyData };