import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const getTasteStatistics = async (state: string, startDate: string, endDate: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`taste/statistics?state=${state}&startDate=${startDate}&endDate=${endDate}`).then(success).catch(fail);
}

const getDailyTaste = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`taste?date=${date}`).then(success).catch(fail);
}

export { getTasteStatistics, getDailyTaste };