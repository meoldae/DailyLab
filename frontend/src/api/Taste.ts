import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const getTasteStatistics = async (state: String, startDate: String, endDate: String, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`taste/statistics?state=${state}&startDate=${startDate}&endDate=${endDate}`).then(success).catch(fail);
}


export { getTasteStatistics };