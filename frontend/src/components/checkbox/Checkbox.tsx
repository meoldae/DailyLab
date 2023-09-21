
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
    index: number,
    state: boolean;
    content: string;
    type: string;
    onCheckboxChange: (index: number, isChecked: boolean) => void;
  }

const Checkbox: React.FC<CheckboxProps> = ({ index, state, content, type, onCheckboxChange }) => {
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

    // 체크박스 선택
    const handleCheckState = () => {
        // defaultLock 상태에서는 체크처리 불가능
        if(type !== 'defaultLock')
            setCheckState(!checkState)
        onCheckboxChange(index, !checkState);
    }

    return (
        <div className="w-full p-4 bg-secondary rounded-xl text-xl">
            <div className="flex items-center justify-between">
                <div className="flex">
                    {/* 체크박스 */}
                    {type !== 'future' && (
                        // future - 체크박스 보이지 않게 처리
                        <img onClick={handleCheckState} className="mr-4 w-[20px]" src={checkState ? "./resources/img/icon/checkbox_fill.png" : "./resources/img/icon/checkbox_empty.png"}  alt="" />
                    )}
                    {/* TODO Content */}
                    {type !== 'plan' ? (
                        <div className={checkState ? "font-medium line-through" : "font-medium"}>
                            {contentText}
                        </div>
                    ) : (
                        inputState === 'input' ?(
                            <div>
                                {contentText}
                            </div>
                        ) : (
                        <div className="child-[select]:bg-secondary">
                            <select name="firstCategory" id="firstCategory">
                                <option value="">대분류1</option>
                                <option value="">대분류2</option>
                            </select>
                            <select name="secondCategory" id="secondCategory">
                                <option value="">중분류1</option>
                                <option value="">중분류2</option>
                            </select>
                            <select name="thridCategory" id="thridCategory">
                                <option value="">소분류1</option>
                                <option value="">소분류2</option>
                            </select>
                        </div>
                        )
                    )}
                </div>
                {/* 우측 버튼 영역 */}
                <div className="pr-4 font-extralight" onClick={HandleSetInputState}>
                    {type === 'plan' && (inputState === 'input' ?(
                        // plan - 수정/완료 버튼 보임
                        <button>
                            수정
                        </button>
                    ):(
                        <button className="underline underline-offset-4" onClick={handleComplete}>
                            완료
                        </button>
                    ))}
                    {type === 'future' && (
                        <button>
                            <img className="w-[15px]" src="./resources/img/icon/x.png" alt="X" />
                        </button>
                    )}
                </div>
            </div>
            {/* 상세내용 입력 input */}
            {type === 'plan' &&  inputState === 'submit' &&(
                <div className="mt-4 p-3 bg-primary placeholder:text-gray text-text font-extralight rounded-xl">
                    <input className="w-full bg-primary" type="text" onChange={handleInputChange} name="contentText" id="contentText" placeholder="상세내용을 입력해주세요"/>
                </div>
            )}

        </div>
    )
}

export default Checkbox;