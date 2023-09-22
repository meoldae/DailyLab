import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const GetHobbyList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`hobby`).then(success).catch(fail);
}

const GetSelectedHobbyList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/hobby`).then(success).catch(fail);
}

const InsertHobby = async (hobbyId: number, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`hobby/${hobbyId}`).then(success).catch(fail);
}

const DeleteHobby = async (hobbyId: number, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.delete(`hobby/${hobbyId}`).then(success).catch(fail);
}

const GetSelectedMbti = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/mbti`).then(success).catch(fail);
}

const UpdateMbti = async (param: object, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/mbti`, JSON.stringify(param)).then(success).catch(fail);
}

const GetSelectedJob = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/job`).then(success).catch(fail);
}

const UpdateJob = async (param: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/job`, JSON.stringify(param)).then(success).catch(fail);
}

const GetSelectedReligion = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/religion`).then(success).catch(fail);
}

const UpdateReligion = async (param: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/religion`, JSON.stringify(param)).then(success).catch(fail);
}

const GetGoal = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`member/goal`).then(success).catch(fail);
}

const UpdateGoal = async (param: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/goal`, JSON.stringify(param)).then(success).catch(fail);
}

const GetSelectedBlackList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`category/blacklist`).then(success).catch(fail);
}

const DeleteBlackList = async (categoryId: number, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.delete(`category/blacklist/cancel/${categoryId}`).then(success).catch(fail);
}

export { GetHobbyList, GetSelectedHobbyList, InsertHobby, DeleteHobby, GetSelectedMbti, UpdateMbti, GetSelectedJob, UpdateJob, GetSelectedReligion, UpdateReligion, GetGoal, UpdateGoal, GetSelectedBlackList, DeleteBlackList};