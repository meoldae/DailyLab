import { TodoType, TodoParamType } from "@/type/TodoType";
import { CategoryKeywordType } from "@/type/CategoryType";
import TodoListItem from "./item/TodoListItem";
import TodoHandleItem from "./item/TodoHandleItem";

interface props {
    type : string
    contents : TodoType[]
    categoryList : CategoryKeywordType[]
    selectToDate : string
    blackItem? : (todoId: number) => void
    deleteItem? : (todoId: number) => void
    updateItem? : (param: TodoParamType) => void
    checkItem? : (param: TodoParamType) => void
    changeItemUpdateMode? : (todoId: number, status: boolean) => void
}

const TodoList = (props: props) => {
    const contents = [...props.contents];
    return (
        <div className="child-[div:not(:last-child)]:mb-4">
            {props.type != "prev" ? contents.map((item, index) => {
                if(item.updateStatus) return <TodoHandleItem selectToDate={props.selectToDate} mode="update" key={index} info={item} updateItem={props.updateItem} categoryList={props.categoryList} changeTodoUpdateMode={props.changeItemUpdateMode} />
                else return <TodoListItem info={item} key={index} status={props.type} blackItem={props.blackItem} deleteItem={props.deleteItem} checkItem={props.checkItem} changeTodoUpdateMode={props.changeItemUpdateMode}/>
            })
            : contents.map((item, index) =>  <TodoListItem info={item} key={index} status={props.type}/>)}
        </div>
    )    
}

export default TodoList;