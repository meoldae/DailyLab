import { HttpJson } from "./Http";
import ReturnType from "@/type/ReturnType";

const getPredictDiary = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`diary/predict/${date}`).then(success).catch(fail);
}

export { getPredictDiary };