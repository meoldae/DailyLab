import { HttpJson } from "./Http";

const getEmotionList =async (success: (data : {data : object}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`/emotion`).then(success).catch(fail);
}

export { getEmotionList };