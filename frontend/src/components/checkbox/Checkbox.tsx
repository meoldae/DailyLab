
/*
--type--
현재 임의로 넣음 -> 추후 부모페이지에서 props로 내려줄 예정
1. default : 기본 체크리스트 - 메인페이지, 캘린더페이지 오늘 날짜 선택 시
2. defaultLock : 기본 체크리스트이지만 체크 해제/선택 불가능 - 캘린더페이지 과거 날짜 선택 시
3. plan : 관심없음, 삭제 버튼이 있고 체크박스에 완료/상세입력이 있음. 상세입력 클릭 시 inputbox 생김. - 내일 계획하기 페이지
4. future : 기본 체크리스트 형태에 체크박스가 없고 우측에 X 버튼이 있음 - 캘린더페이지 미래 날짜 선택 시
*/

import { useState } from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
import CheckboxCategory from "./CheckboxCategory";
import { blackTodoItems, deleteTodoItems } from "@/api/Todo";

  

  
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

const Checkbox: React.FC<CheckboxProps> = ({ todoId, state, content, type, onCheckboxChange, large, medium, small, categoryId }) => {
    const [checkState, setCheckState] = useState(state);
    const [inputState, setInputState] = useState('input');
    const [contentText, setContentText] = useState(content);
    const [inputValue, setInputValue] = useState('');

    const HandleSetInputState = () => {
        setInputState(inputState === 'input' ? 'submit' : 'input');
    }

    // 체크박스 선택
    const handleCheckState = () => {
        // defaultLock 상태에서는 체크처리 불가능
        if(type !== 'defaultLock')
            setCheckState(!checkState)
        onCheckboxChange(todoId, !checkState);
    }

    const leadingActions = () => (
        <LeadingActions>
          <SwipeAction destructive={true} onClick={() => {console.info('관심없어용',todoId); blackTodo();}}>
          <div className='bg-yellow flex justify-center items-center rounded-xl text-white'>
                관심없음
            </div>
          </SwipeAction>
        </LeadingActions>
      );
      
      const trailingActions = () => (
        <TrailingActions>
            <SwipeAction destructive={true} onClick={() => {console.info('삭제할랭', todoId); deleteTodo();}}>
            <div className='bg-orange flex justify-center items-center rounded-xl text-white'>
                삭제하기
            </div>
            </SwipeAction>
      </TrailingActions>
      );
    
      
      const blackTodo = async () => {
        const todoItem = [todoId]
    
        await blackTodoItems({todoIdList: todoItem },({ data }) => {
            console.log(data);
            alert("관심없음 처리")
            deleteTodo();
        }, (error) => {console.log(error)});
    }

      const deleteTodo = async () => {
        // checkedItems를 삭제하는 API 함수 호출하고 리스트 받아오는 API다시 요청하기
        const todoItem = [todoId]
    
        await deleteTodoItems({todoIdList: todoItem },({ data }) => {
            console.log(data);
        }, (error) => {console.log(error)});
    }


    return (
        <SwipeableList>
            <SwipeableListItem
            className=''
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
            >
                <div className="w-full p-4 bg-secondary rounded-xl text-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex w-full justify-between">
                            <div className="w-full mr-10 text-left">
                                {/* TODO Content */}
                                {(inputState !== 'input') ? (
                                    <CheckboxCategory setInputState={HandleSetInputState} todoId={todoId} large={large} medium={medium} small={small} content={content} categoryId={categoryId}/>
                                    ) : (<div onClick={HandleSetInputState}>{(content === '' || content === '상세내용') ? small : contentText}</div>)
                                }
                            </div>
                            {/* 체크박스 */}
                            {type === 'future' ||  inputState === 'input' &&(
                                // future - 체크박스 보이지 않게 처리
                                <img onClick={handleCheckState} className="w-[20px]" src={checkState ? "./assets/img/icon/checkbox_fill.png" : "./assets/img/icon/checkbox_empty.png"}  alt="" />
                            )}
                        </div>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Checkbox;