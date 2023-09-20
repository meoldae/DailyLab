import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

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
    date? : string;
  }

const CheckboxList: React.FC<CheckboxListProps> = ({ type }) => {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [checkedItemNo, setCheckedItemNo] = useState(0);
    const [showInput, setShowInput] = useState(false); // Add state for input visibility
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
    
    useEffect(() => {
        if(type === 'default' && checkedItemNo !== 0){
            console.log('checkedItemNo', checkedItemNo)
            // 할 일 체크여부 업데이트하는 API 함수 호출
        }
    }, [checkedItems]);

    useEffect(() => {
        if(type === 'plan'){
            // plan 리스트 불러오는 API 함수 호출
        }
        else{
            // default 리스트 불러오는 API 함수 호출
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
            {todoList.length > 0 && todoList.map((todo)=>(
                <Checkbox key={todo.index} index={todo.index} state={todo.state} content={todo.content} type={type} 
                onCheckboxChange={handleCheckboxChange}/>
            ))}
            {showInput && (
                <div className="flex mt-4">
                    <input
                        type="text"
                        className="border border-gray-300 p-2 mr-2 rounded"
                        value={newTodoContent}
                        onChange={handleInputChange}
                    />
                    <button
                        className="w-28 h-10 bg-text rounded-xl"
                        onClick={handleAddTodo}
                    >
                        추가하기
                    </button>
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

const todoList = [
    {
        index: 1,
        state: true,
        content:'첫번째 할 일',
    },
    {
        index: 2,
        state: false,
        content:'두번째 할 일',
    },
    {
        index: 3,
        state: false,
        content:'할일3',
    },
    {
        index: 4,
        state: false,
        content:'할일4',
    },
    {
        index: 5,
        state: false,
        content:'할일5',
    },
    {
        index: 6,
        state: false,
        content:'할일6',
    },
]
