import { useEffect, useState } from "react";
import { TodoType, TodoParamType } from "@/type/TodoType";
import { getTodoList, getCategoryList, blackTodoItem, deleteTodoItem, updateTodoItem, checkTodoItem, insertTodoItem } from "@/api/Todo"; 
import TodoHandleItem from "./item/TodoHandleItem";
import TodoList from "./TodoList";
import { CategoryType } from "@/type/CategoryType";

interface props {
    type : string; //1. current, 2. prev, 3. future
    date : string;
}

const Todo = (props: props) => {
    const [contentsList, setContentsList] = useState<TodoType[]>([]);
    useEffect(() => {getTodoList(props.date, ({data}) => {setContentsList(() => data.data as TodoType[]);}, (error) => console.log(error));}, []);

    const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
    useEffect(() => {getCategoryList(({data}) => {setCategoryList(() => data.data as CategoryType[]);}, (error) => console.log(error));}, []);

    const [insertMode, setInsertMode] = useState(false);
    function handleInsertMode() {setInsertMode((prev) => !prev);}

    async function blackTodo(todoId: number){
        await blackTodoItem(todoId, ({data}) => {
            const result = contentsList.filter(contents => contents.todoId != todoId);
            setContentsList(() => result);
        }, (error) => console.log(error));
    }

    async function deleteTodo(todoId: number){
        await deleteTodoItem(todoId, ({data}) => {
            const result = contentsList.filter(contents => contents.todoId != todoId);
            setContentsList(() => result);
        }, (error) => console.log(error));
    }

    async function insertTodo(param: TodoParamType){
        await insertTodoItem(param, ({data}) => {
            const result = [...contentsList];
            result.push(data.data as TodoType);
            setContentsList(() => result);
        }, (error) => console.log(error));
    }

    async function updateTodo(param: TodoParamType){
        await updateTodoItem(param, ({data}) => {
            const updateData = data.data as TodoType;
            const result = contentsList.map((todo) => todo.todoId === updateData.todoId ? updateData : todo);
            setContentsList(() => result);
        }, (error) => console.log(error));
    }

    function changeTodoUpdateMode(todoId: number, status: boolean){
        const result = [...contentsList];
        result.find(contents => contents.todoId == todoId)!.updateStatus = status;
        setContentsList(() => result);
    }

    async function checkTodo(param: TodoParamType){
        await checkTodoItem(param, ({data}) => {
            const result = [...contentsList];
            result.find(contents => contents.todoId == param.todoId)!.check = param.checkedDate != "";
            setContentsList(() => result);
        }, (error) => console.log(error));
    }

    return (
        <>
            <div className="bg-primary rounded-2xl px-5 py-8">
                <TodoList type={props.type} contents={contentsList} blackItem={blackTodo} deleteItem={deleteTodo} checkItem={checkTodo} updateItem={updateTodo} changeItemUpdateMode={changeTodoUpdateMode}  categoryList={categoryList}/>
                {insertMode ? <div className="mt-4"><TodoHandleItem insertItem={insertTodo} mode="insert" categoryList={categoryList} changeInsertMode={handleInsertMode} /></div> : null}

                {props.type != "prev" && !insertMode ?
                    <div className="text-right text-xl text-primary mt-4">
                        <button onClick={handleInsertMode} className="mr-4 w-28 h-10 bg-text rounded-xl ">
                            추가
                        </button>
                    </div>
                : null}
            </div>
        </>
    )    
}

export default Todo;