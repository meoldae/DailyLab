import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

type EmotionData = {
    emotionId: number;
    timeStamp: string;
}

const getEmotionList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`emotion`).then(success).catch(fail);
}

const getDailyData = async (param: object, success: (data : {data: ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`emotion/date`, { params: param }).then(success).catch(fail);
} 

const getRatioData = async (date: string, success: (data : {data: ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`emotion/date?date=${date}&state=true`,).then(success).catch(fail);
} 

const getPeriodData = async (startdate: string, enddate: string, success: (data : {data: ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`emotion/period?startdate=${startdate}&enddate=${enddate}`).then(success).catch(fail);
}  

const getAggregateData = async (state: string, startdate: string, enddate: string, success: (data : {data: ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`emotion/aggregate?state=${state}&startdate=${startdate}&enddate=${enddate}`).then(success).catch(fail);
}  

const putEmotion = async (param: EmotionData, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`emotion`, JSON.stringify(param)).then(success).catch(fail);
}

export { getEmotionList, getDailyData, putEmotion, getPeriodData, getAggregateData, getRatioData};