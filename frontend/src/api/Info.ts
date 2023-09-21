import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const GetHobbyList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`hobby`).then(success).catch(fail);
}

const GetSelectedHobbyList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`hobby`).then(success).catch(fail);
}

export { GetHobbyList, GetSelectedHobbyList};