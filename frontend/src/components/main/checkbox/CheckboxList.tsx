import Checkbox from "./Checkbox";

const CheckboxList = () => {
    return (
        <div className="bg-primary rounded-2xl px-5 py-8 
        child-[div:not(:last-child)]:mb-4">
            {todoList.length > 0 && todoList.map((todo, index)=>(
                <Checkbox key={index} state={todo.state} content={todo.content}/>
            ))}
        </div>
    )
}

export default CheckboxList;

const todoList = [
    {
        state: true,
        content:'강의듣기'
    },
    {
        state: false,
        content:'강의듣기'
    },
    {
        state: false,
        content:'강의듣기'
    },
]