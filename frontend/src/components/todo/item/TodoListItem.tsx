import { TodoType, TodoParamType } from "@/type/TodoType";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import checkBoxFillImg from "public/assets/img/icon/checkbox_fill.png";
import checkBoxEmptyImg from "public/assets/img/icon/checkbox_empty.png";
import { toStringByFormattingIncludeTime } from "@/utils/date/DateFormatter";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface props {
    info : TodoType
    status : string
    updateStatus? : (todoId: number) => void
    updateItem? : (todoId: number) => void
    blackItem? : (todoId: number) => void
    deleteItem? : (todoId: number) => void
    checkItem? : (param: TodoParamType) => void
    changeTodoUpdateMode? : (todoId: number, status: boolean) => void
}

const TodoListItem = (props: props) => {
    const controls = useAnimation(); 
    
    function clickCheckItem(){
        controls.start({ x: [-5, 5, -1, 1, 0], transition: { duration: 0.5 } }); 
        const param:TodoParamType = {todoId : props.info.todoId, checkedDate : (!props.info.check ? toStringByFormattingIncludeTime(new Date()) : ""), categoryName : props.info.small};
        props.checkItem!(param);
    }

    const leadingActions = () => (
        <LeadingActions>
          <SwipeAction destructive={true} onClick={() => props.blackItem!(props.info.todoId)}>
            <div className='bg-yellow flex justify-center items-center rounded-xl text-white'>관심없음</div>
          </SwipeAction>
        </LeadingActions>
    );
      
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction destructive={true} onClick={() => props.deleteItem!(props.info.todoId)}>
                <div className='bg-orange flex justify-center items-center rounded-xl text-white'>삭제하기</div>
            </SwipeAction>
        </TrailingActions>
    );
    if(props.status != "prev") {
        return (
            <SwipeableList>
                <SwipeableListItem maxSwipe={0.7} threshold={0.5} listType={Type.IOS} leadingActions={leadingActions()} trailingActions={trailingActions()}>
                    <motion.div animate={controls} className={`w-full p-4 rounded-xl text-xl flex justify-between${props.info.system ? " border border-[rgba(255,137,26,0.3)]" : null} ${props.info.check ? "bg-[#ff9c4047]" : "bg-secondary"}`}>
                        <div className="mr-10 text-left flex-1">
                            <div className="cursor-pointer" onClick={() => props.changeTodoUpdateMode!(props.info.todoId, true)}>{(props.info.content === "" || props.info.content === "상세내용") ? props.info.small : props.info.content}</div>
                        </div>
                        {props.status == "current" ? <img onClick={clickCheckItem} className="w-[20px] cursor-pointer" src={props.info.check ? checkBoxFillImg : checkBoxEmptyImg }  alt="" /> : null}
                    </motion.div>
                </SwipeableListItem>
            </SwipeableList>
        )
    }
    return (
        <div className={`w-full p-4 bg-secondary rounded-xl text-xl flex justify-between${props.info.system ? " border border-[rgba(255,137,26,0.3)]" : null}`}>
            <div className="mr-10 text-left flex-1">
                <div>{(props.info.content === "" || props.info.content === "상세내용") ? props.info.small : props.info.content}</div>
            </div>
        </div>
    )
}

export default TodoListItem;