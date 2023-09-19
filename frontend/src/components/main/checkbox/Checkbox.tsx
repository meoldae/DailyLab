
/*
--type--
현재 임의로 넣음 -> 추후 부모페이지에서 props로 내려줄 예정
1. default : 기본 체크리스트 - 메인페이지, 캘린더페이지 오늘 날짜 선택 시
2. defaultLock : 기본 체크리스트이지만 체크 해제/선택 불가능 - 캘린더페이지 과거 날짜 선택 시
3. plan : 관심없음, 삭제 버튼이 있고 체크박스에 완료/상세입력이 있음. 상세입력 클릭 시 inputbox 생김. - 내일 계획하기 페이지
4. future : 기본 체크리스트 형태에 체크박스가 없고 우측에 X 버튼이 있음 - 캘린더페이지 미래 날짜 선택 시
*/

import { useState } from "react";

interface CheckboxProps {
    state: boolean;
    content: string;
    type: string;
  }

const Checkbox: React.FC<CheckboxProps> = ({ state, content, type }) => {
    const [checkState, setCheckState] = useState(state);
    const [inputState, setInputState] = useState('input');
    const [contentText, setContentText] = useState(content);
    const [inputValue, setInputValue] = useState('');

    const HandleSetInputState = () => {
        setInputState(inputState === 'input' ? 'submit' : 'input');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleComplete = () => {
        const trimmedInputValue = inputValue.trim();
        if(trimmedInputValue !== '')
            setContentText(trimmedInputValue);
    }

    const handleCheckState = () => {
        // defaultLock 상태에서는 체크처리 불가능
        if(type !== 'defaultLock')
            setCheckState(!checkState)
    }

    return (
        <div className="w-full p-4 bg-secondary rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex">
                    {type !== 'future' && (
                        // 캘린더에서 미래 날짜 클릭 시에는 체크박스 보이지 않음
                        <img onClick={handleCheckState} className="mr-4 w-[20px]" src={checkState ? "src/resources/img/checkbox/checkbox_fill.png" : "src/resources/img/checkbox/checkbox_empty.png"}  alt="" />
                    )}
                    <p className={checkState ? "font-medium line-through" : "font-medium"}>
                        {contentText}
                    </p>
                </div>
                <div className="pr-4 font-extralight" onClick={HandleSetInputState}>
                    {type === 'plan' && (inputState === 'input' ?(
                        // 내일 할 일 계획 - 상세입력 버튼 보임
                        <button>
                            상세입력
                        </button>
                    ):(
                        <button onClick={handleComplete}>
                            완료
                        </button>
                    ))}
                </div>
            </div>
            {type === 'plan' &&  inputState === 'submit' &&(
                // 상세내용 입력 input
                <div className="mt-4 p-3 bg-primary placeholder:text-gray text-text font-extralight rounded-xl">
                    <input className="w-full" type="text" onChange={handleInputChange} name="contentText" id="contentText" placeholder="상세내용을 입력해주세요"/>
                </div>
            )}

        </div>
    )
}

export default Checkbox;