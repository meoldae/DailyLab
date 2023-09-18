import Checkbox from "./Checkbox";

const CheckboxList = () => {
    return (
        <div className="bg-primary rounded-2xl px-5 py-8 
        child-[div:not(:last-child)]:mb-4">
            {tempState === 'plan' && (
            <div className="text-right text-xl text-primary">
                <button className="mr-4 w-28 h-10 bg-gray rounded-xl ">
                    관심없음
                </button>
                <button className="w-28 h-10 bg-gray rounded-xl">
                    삭제
                </button>
            </div>)}
            {todoList.length > 0 && todoList.map((todo, index)=>(
                <Checkbox key={index} state={todo.state} content={todo.content} type={todo.type}/>
            ))}
        </div>
    )
}

export default CheckboxList;

// 임의로 넣어놓음
const tempState = 'plan'

/*
--type--
현재 임의로 넣음 -> 추후 부모페이지에서 props로 내려줄 예정
1. default : 기본 체크리스트 - 메인페이지, 캘린더페이지 오늘 날짜 선택 시
2. defaultLock : 기본 체크리스트이지만 체크 해제/선택 불가능 - 캘린더페이지 과거 날짜 선택 시
3. plan : 관심없음, 삭제 버튼이 있고 체크박스에 완료/상세입력이 있음. 상세입력 클릭 시 inputbox 생김. - 내일 계획하기 페이지
4. future : 기본 체크리스트 형태에 체크박스가 없고 우측에 X 버튼이 있음 - 캘린더페이지 미래 날짜 선택 시
*/
const todoList = [
    {
        state: true,
        content:'메인이랑 오늘 캘린더 보여줄때',
        type: 'default'
    },
    {
        state: false,
        content:'기본 체크박스에 체크변경 불가능',
        type: 'defaultLock'
    },
    {
        state: false,
        content:'내일 계획하기 페이지',
        type: 'plan'
    },
    {
        state: false,
        content:'캘린더페이지 미래 날짜 선택 시',
        type: 'future'
    },
]