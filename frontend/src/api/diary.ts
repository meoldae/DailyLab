import { HttpJson } from "./Http";
import ReturnType from "@/type/ReturnType";

// 미래 일기 생성(3.5)
const postPredictDiary = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`diary/predict?date=${date}`).then(success).catch(fail);
}

// 미래 일기 읽기
const getPredictDiary = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`diary/predict/${date}`).then(success).catch(fail);
}

// 오늘 일기 생성 요청(4.0)
const postTodayDiary = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`diary/confirm?date=${date}`).then(success).catch(fail);
}

// 오늘 일기 읽기
const getTodayDiary = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`diary/confirm/${date}`).then(success).catch(fail);
}

export { postPredictDiary, getPredictDiary, getTodayDiary, postTodayDiary };