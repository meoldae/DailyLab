import { HttpJson } from "./Http";
import EmotionType from "@/type/EmotionType";

interface props {
    data : EmotionType[]
}

const getEmotionList =async (success: (data : {data : props}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get('emotion').then(success).catch(fail);
}

export { getEmotionList };