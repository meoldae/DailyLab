import React from 'react';
import { GetMode } from "@/atom/modeAtom";
import leftArrowImgLight from './assets/img/custom_calendar_month_arrow_left_light.png';
import leftArrowImgDark from './assets/img/custom_calendar_month_arrow_left_dark.png';
import rightArrowImgLight from './assets/img/custom_calendar_month_arrow_right_light.png';
import rightArrowImgDark from './assets/img/custom_calendar_month_arrow_right_dark.png';

interface CalendarProps {
    curMonth : number
    firstDate : Date
    lastDate : Date
    dateContents : JSX.Element[]
    prevMonthEvent : () => void
    nextMonthEvent : () => void
}

const CustomCalendar = (props : CalendarProps) => {
    const isLight = GetMode() == 'light';


    for(let i=props.firstDate.getDay(); i > 1; i--) props.dateContents.unshift(<div></div>);

    return (   
        <div>
            <div className='w-full mb-[10px] flex justify-between'>
                <button type="button" onClick={props.prevMonthEvent}><img src={isLight ? leftArrowImgLight : leftArrowImgDark} alt="과거로 아이콘" className='w-[27px]'/></button>
                <span className='text-[15px] font-semibold'>{props.curMonth}월</span>    
                <button type="button" onClick={props.nextMonthEvent}><img src={isLight ? rightArrowImgLight : rightArrowImgDark} alt="미래로 아이콘" className='w-[27px]'/></button>
            </div>
            <div className='w-full mb-[15px]'>
                <div className="overflow-hidden w-[calc(100% + 13px)] -ml-[13px] child-[div]:float-left child-[div]:w-[14.285%] child-[div]:pl-[13px] child-[div]:text-[15px] child-[div]:text-center">
                    <div>월</div>
                    <div>화</div>
                    <div>수</div>
                    <div>목</div>
                    <div>금</div>
                    <div>토</div>
                    <div>일</div>
                </div>
            </div>
            <div className="w-full">
                <div className="overflow-hidden -mb-[20px] w-[calc(100% + 13px)] -ml-[13px]  child-[div]:float-left child-[div]:w-[14.285%] child-[div]:pl-[13px] child-[div]:mb-[20px]">
                    {props.dateContents.map((component, index) => (
                        <React.Fragment key={index}>
                            {component}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )   
};

export default CustomCalendar;