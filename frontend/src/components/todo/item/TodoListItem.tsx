import { TodoType } from "@/type/TodoType";

interface props {
    info : TodoType
    changeStatus? : (todoId: number) => void
    updateItem? : (todoId: number) => void
    deleteItem? : (todoId: number) => void
}

const TodoListItem = () => {
    return (
        <div>

        </div>
    )
}

export default TodoListItem;