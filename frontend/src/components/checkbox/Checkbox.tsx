
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
    todoId: number,
    state: boolean;
    content: string;
    type: string;

    categoryId?: number,
    large?: string,
    medium?: string,
    small?: string,
    todoDate?: string,
    checkedDate?: string,
    check?: boolean,
    memberId?: number,
    username?: string,
    system?: boolean,
    deleted?: boolean

    onCheckboxChange: (todoId: number, isChecked: boolean) => void;
  }

const Checkbox: React.FC<CheckboxProps> = ({ todoId, state, content, type, onCheckboxChange, small }) => {
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
        onCheckboxChange(todoId, !checkState);
    }

    return (
        <div className="w-full p-4 bg-secondary rounded-xl text-xl">
            <div className="flex items-center justify-between">
                <div className="flex w-full justify-between">
                    <div className="w-full mr-10 text-left">
                        {/* TODO Content */}
                        {(inputState !== 'input') ? (
                            <div className="">
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
                                {/* 여기서 완료 누르면 카테고리 적용되고 content에 상세 내용 넣기 */}
                                <input className="w-full p-3 m-1 rounded-xl" type="text" name="" id="" placeholder="상세 내용을 입력해주세요!!" />
                            </div>
                            ) : (<div onClick={HandleSetInputState}>{(content === '' || content === '상세내용') ? small : contentText}</div>)
                        }
                    </div>
                    {/* 체크박스 */}
                    {type === 'future' ||  inputState === 'input' &&(
                        // future - 체크박스 보이지 않게 처리
                        <img onClick={handleCheckState} className="w-[20px]" src={checkState ? "./assets/img/icon/checkbox_fill.png" : "./assets/img/icon/checkbox_empty.png"}  alt="" />
                    )}
                </div>
                {/* 우측 버튼 영역 */}
                <div className="pr-4 font-extralight" onClick={HandleSetInputState}>
                    {inputState !== 'input' &&(
                        <button className="w-[30px] underline underline-offset-4" onClick={() => {handleComplete(); HandleSetInputState();}}>
                            완료
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Checkbox;