import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

type EmotionData = {
    emotionId: number;
    timeStamp: string;
}


const getEmotionList =async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`emotion`).then(success).catch(fail);
}

const getDailyData =async (param: object, success: ({data: object}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`emotion/date`, { params: param }).then(success).catch(fail);
}

const putEmotion = async (param: EmotionData, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`emotion`, JSON.stringify(param)).then(success).catch(fail);
}

export { getEmotionList, getDailyData, putEmotion };