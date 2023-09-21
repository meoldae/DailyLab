import ReturnType from "@/type/ReturnType";
import { HttpJson } from "./Http";

type TodoData = {
    todoId: number;
    timeStamp: string;
}

const getDefaultTodoList =async (todoDate: string, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.get(`todo/${todoDate}`).then(success).catch(fail);
}

const checkUpdateTodoItem = async (param: TodoData, success: (data : {data : ReturnType}) => void, fail: (error: unknown) => void) => {
    await HttpJson.put(`todo/checkItem`, JSON.stringify(param)).then(success).catch(fail);
}

export { getDefaultTodoList, checkUpdateTodoItem };