import { useLayoutEffect, useEffect, useState } from "react";
import { TodoType, TodoParamType } from "@/type/TodoType";
import { getTodoList, getCategoryKeywordList, blackTodoItem, deleteTodoItem, updateTodoItem, checkTodoItem, insertTodoItem } from "@/api/Todo"; 
import TodoHandleItem from "./item/TodoHandleItem";
import TodoList from "./TodoList";
import { CategoryKeywordType } from "@/type/CategoryType";
import UseInterval from "@/utils/useInterval/UseInterval";
import { toStringByFormatting } from "@/utils/date/DateFormatter";

interface props {
    mode : string; //1. current, 2. prev, 3. future
    date : string;
    setText? : (selectText: string) => void
}

const Todo = (props: props) => {
    const [contentsList, setContentsList] = useState<TodoType[]>([]);
    const [getTodoStatus, setGetTodoStatus] = useState<boolean>(false);
    async function getContentsList() {
        await getTodoList(props.date, ({data}) => {
            setContentsList(() => data.data as TodoType[]);
        }, (error) => console.log(error));
    }

    useLayoutEffect(() => {getContentsList()}, [props]);

    UseInterval(() => {
        getContentsList();
    }, getTodoStatus ? 1500 : null);

    useEffect(() => {
        if(props.date == toStringByFormatting(new Date()) && contentsList.length == 0) setGetTodoStatus(() => true);
        else setGetTodoStatus(() => false);
    }, [contentsList]);

    const [categoryList, setCategoryList] = useState<CategoryKeywordType[]>([]);
    useEffect(() => {getCategoryKeywordList(({data}) => {setCategoryList(() => data.data as CategoryKeywordType[]);}, (error) => console.log(error));}, []);

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
            setInsertMode((prev) => !prev);
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
            if(param.checkedDate != "") props.setText!(param.categoryName!);
            else props.setText!("");
            setContentsList(() => result);
        }, (error) => console.log(error));
    }

    return (
        <>
            <div className="bg-primary rounded-2xl px-5 py-8">
                <TodoList type={props.mode} contents={contentsList} selectToDate={props.date} blackItem={blackTodo} deleteItem={deleteTodo} checkItem={checkTodo} updateItem={updateTodo} changeItemUpdateMode={changeTodoUpdateMode}  categoryList={categoryList}/>
                {insertMode ? <div className="mt-4"><TodoHandleItem selectToDate={props.date} insertItem={insertTodo} mode="insert" categoryList={categoryList} changeInsertMode={handleInsertMode} /></div> : null}

                {props.mode != "prev" && !insertMode ?
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