import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

const getTodoList = async (todoDate: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`todo/full/${todoDate}`).then(success).catch(fail);
}

const getCategoryList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`category/all/tree`).then(success).catch(fail);
}

const getCategoryKeywordList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`category`).then(success).catch(fail);
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

const getTodoStatistics = async (state: string, startDate: string, endDate: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`todo/statistics?state=${state}&startDate=${startDate}&endDate=${endDate}`).then(success).catch(fail);
}

export { getCategoryList, getCategoryKeywordList, getTodoList, insertTodoItem, checkTodoItem, blackTodoItem, updateTodoItem, deleteTodoItem, getTodoStatistics };