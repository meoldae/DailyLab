import { useEffect, useState } from "react";
import { TodoType } from "@/type/TodoType";
import { getTodoList } from "@/api/Todo"; 

interface props {
    type : string; //1. default : 추가, 업데이트, 체크 가능 2. lock : 추가, 업데이트, 체크 불가
    date : string;
}

const Todo = (props: props) => {
    const [contentsList, setContentsList] = useState<TodoType[]>([]);

    const [insertMode, setInsertMode] = useState(false);
    function handleInsertMode() {setInsertMode((prev) => !prev);}

    return (
        <>
            <div className="bg-primary rounded-2xl px-5 py-8 child-[div:not(:last-child)]:mb-4">

            </div>
            {props.type == "default" ?
                <div className="text-right text-xl text-primary">
                    <button onClick={handleInsertMode} className="mr-4 w-28 h-10 bg-text rounded-xl ">
                        추가
                    </button>
                </div>
            : null}
        </>
    )    
}

export default Todo;