import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const getMonthScheduleList = async (param: object, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/calendar`, JSON.stringify(param)).then(success).catch(fail);
}

export { getMonthScheduleList };