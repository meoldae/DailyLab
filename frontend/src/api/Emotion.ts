import EmotionType from "@/type/EmotionType";
import { HttpJson } from "./Http";

const getEmotionList =async (success: (data : {data : EmotionType[]}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`/emotion`).then(success).catch(fail);
}

const getDailyData =async (param: object, success: ({data: object}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`/emotion/date`, { params: param }).then(success).catch(fail);
}

export { getEmotionList, getDailyData };