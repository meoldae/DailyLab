import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const getDefaultTodoList = async (todoDate: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`todo/${todoDate}`).then(success).catch(fail);
}

const getTodoList = async (todoDate: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`todo/full/${todoDate}`).then(success).catch(fail);
}

const makePlanTodoList = async (todoDate: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`todo/recommend/${todoDate}`).then(success).catch(fail);
}

// 상태 proceed로 바꾸기
const setStatusProceed = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/start/${date}`).then(success).catch(fail);
}

// 상태 finish로 바꾸기
const setStatusFinish = async (date: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`member/end/${date}`).then(success).catch(fail);
}

const getCategoryList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`category/all/tree`).then(success).catch(fail);
}

const insertTodoItem = async (param: object, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`todo`, JSON.stringify(param)).then(success).catch(fail);
}

const checkTodoItem = async (param: object, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.put(`todo/check`, JSON.stringify(param)).then(success).catch(fail);
}

const updateTodoItem = async (param: object, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.put(`todo/change`, JSON.stringify(param)).then(success).catch(fail);
}

const deleteTodoItem = async (todoId: number, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.put(`todo/delete/${todoId}`).then(success).catch(fail);
}

const blackTodoItem = async (todoId: number, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.post(`category/blacklist/black/${todoId}`).then(success).catch(fail);
}

export { getDefaultTodoList, insertTodoItem, checkTodoItem, blackTodoItem, updateTodoItem, setStatusProceed, setStatusFinish, getCategoryList, getTodoList, makePlanTodoList, deleteTodoItem };