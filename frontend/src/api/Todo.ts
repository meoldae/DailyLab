import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

type TodoData = {
    todoId: number;
    checkedDate: string;
}

const getDefaultTodoList = async (todoDate: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`todo/${todoDate}`).then(success).catch(fail);
}

const checkUpdateTodoItem = async (param: TodoData, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.put(`todo/change/check`, JSON.stringify(param)).then(success).catch(fail);
}

const getCategoryList = async (success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`category/all/tree`).then(success).catch(fail);
}

export { getDefaultTodoList, checkUpdateTodoItem, getCategoryList };