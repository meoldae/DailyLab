import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { checkUpdateTodoItem, getDefaultTodoList, getPlanTodoList } from "@/api/Todo";
import { addHours } from "date-fns";

/*
--type--
현재 임의로 넣음 -> 추후 부모페이지에서 props로 내려줄 예정
1. default : 기본 체크리스트 - 메인페이지, 캘린더페이지 오늘 날짜 선택 시
2. defaultLock : 기본 체크리스트이지만 체크 해제/선택 불가능 - 캘린더페이지 과거 날짜 선택 시
3. plan : 관심없음, 삭제 버튼이 있고 체크박스에 완료/상세입력이 있음. 상세입력 클릭 시 inputbox 생김. - 내일 계획하기 페이지
4. future : 기본 체크리스트 형태에 체크박스가 없고 우측에 X 버튼이 있음 - 캘린더페이지 미래 날짜 선택 시
*/

interface CheckboxListProps {
    type: string;
    date : string;
  }
interface TodoType {
    todoId: number,
    check: boolean,
    content: string,
    categoryId?: number,
    large?: string,
    medium?: string,
    small?: string,
    todoDate?: string,
    checkedDate?: string,
    memberId?: number,
    username?: string,
    system?: boolean,
    deleted?: boolean
}

const CheckboxList: React.FC<CheckboxListProps> = ({ type, date }) => {
    const [items, setItems] = useState<TodoType[]>([]);
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [checkedItemNo, setCheckedItemNo] = useState(0);
    const [showInput, setShowInput] = useState(false);
    const [newTodoContent, setNewTodoContent] = useState('');

    // plan 인 경우 체크된 목록을 얻기 위한 부분
    const handleCheckboxChange = (index : number, isChecked : boolean) => {
        setCheckedItemNo(index);
        if (isChecked) {
            setCheckedItems([...checkedItems, index]);
        } else {
            setCheckedItems(checkedItems.filter((item: number) => item !== index));
        }
    }

    const noRecommendTodo = () => {
        console.log('noRecommendTodo', checkedItems)
        // checkedItems를 관심없음 처리하는 API함수 호출
        deleteTodo();
    }
    
    const deleteTodo = () => {
        console.log('deleteTodo', checkedItems)
        // checkedItems를 삭제하는 API 함수 호출
    }

    const handleAddButton = () => {
        setShowInput(true); // 입력창 보이기
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoContent(e.target.value);  // 입력창에 입력할때마다 할일내용 갱신
    }

    const handleAddTodo = () => {
        // TODO 리스트 추가하는 API 호출
        setShowInput(false); // 입력창 숨기기
        setNewTodoContent(''); // 입력내용 초기화
    }
    
    
    const getDefaultList = async (date : string) => {
        await getDefaultTodoList(date, ({data}) => {
            setItems(data.data as TodoType[]);
        }, (error) => {console.log(error)})
    }

    const getPlanList = async (date : string) => {
        await getPlanTodoList(date, ({data}) => {
            console.log(data)
            setItems(data.data as TodoType[]);
        }, (error) => {console.log(error)})
    }


    const updateCheckItem = async (todoId : number) => {
        const now = new Date();
        const newDate = addHours(now, 9);
        const formattedDateTime = newDate.toISOString().slice(0, 16).replace("T", " ");

        console.log(todoId, formattedDateTime)
        const todoData = {
            todoId: todoId,
            checkedDate: formattedDateTime
        };

        await checkUpdateTodoItem(todoData,({ data }) => {
            console.log(data);
        }, (error) => {console.log(error)});
    }

    // 체크한 item의 목록이 바뀔 때 마다 체크한것 확인하기
    useEffect(() => {
        if(type === 'default' && checkedItemNo !== 0){
            console.log('checkedItemNo', checkedItemNo)
            updateCheckItem(checkedItemNo);
        }
    }, [checkedItems]);

    useEffect(() => {
        if(type === 'plan'){
            // plan 리스트 불러오는 API 함수 호출
            getPlanList(date);
        }
        else{
            // default 리스트 불러오기
            getDefaultList(date);
        }
    }, []);

    return (
        <div className="bg-primary rounded-2xl px-5 py-8 
        child-[div:not(:last-child)]:mb-4">
            {type === 'plan' && (
            <div className="text-right text-xl text-primary">
                <button onClick={noRecommendTodo} className="mr-4 w-28 h-10 bg-gray rounded-xl">
                    관심없음
                </button>
                <button onClick={deleteTodo} className="w-28 h-10 bg-gray rounded-xl">
                    삭제
                </button>
            </div>)}
            {items.length > 0 && items.map((todo)=>(
                <Checkbox key={todo.todoId} todoId={todo.todoId} state={todo.check} content={todo.content} type={type} 
                large={todo.large} medium={todo.medium} small={todo.small}
                onCheckboxChange={handleCheckboxChange}/>
            ))}
            {showInput && (
                <div className="w-full p-4 bg-secondary rounded-xl text-xl">
                    <div className="flex items-center justify-between">
                        <input
                            type="text"
                            className="border-none bg-secondary text-text ml-2 placeholder:text-gray"
                            value={newTodoContent}
                            onChange={handleInputChange}
                            placeholder="할 일을 입력해 주세요!"
                            />
                        <button
                            className="pr-4 font-semibold text-text underline underline-offset-4"
                            onClick={handleAddTodo}
                            >
                            확인
                        </button>
                    </div>
                </div>
            )}
            {type == 'plan' && (
                <div className="text-right text-xl text-primary">
                <button onClick={handleAddButton} className="mr-4 w-28 h-10 bg-text rounded-xl ">
                    추가
                </button>
            </div> 
            )}
        </div>
    )
}

export default CheckboxList;
