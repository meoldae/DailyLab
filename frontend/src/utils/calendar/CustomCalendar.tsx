import { useState, useEffect } from 'react';
import CustomCalendarItem from './item/CustomCalendarItem';
import { toStringByFormatting } from '@/utils/date/DateFormatter';

interface CalendarProps {
    initDate : string
    showOverDate : boolean
}

const CustomCalendar = (props : CalendarProps) => {
    const initDateTemp = new Date(props.initDate);
    const initDateYear = initDateTemp.getFullYear();
    const initDateMonth = initDateTemp.getMonth();
    const firstDate = new Date(initDateYear, initDateMonth, 1);
    const lastDate = new Date(initDateYear, initDateMonth + 1, 0);
    const [dateList, setDateList] = useState<string[]>([]);
    function getDateList() {
        const result:string[] = [];
        const tempFirstDate = firstDate;
        const tempLastDate = lastDate;
        while(tempFirstDate.getTime() != tempLastDate.getTime()){
            result.push(toStringByFormatting(tempFirstDate));
            tempFirstDate.setDate(tempFirstDate.getDate() + 1);
        }
        result.push(toStringByFormatting(tempLastDate));
        setDateList(() => result);
    }
    useEffect(() => {
        getDateList();
    }, []);

    return (
        <div>
            <div><button>과거로</button>{dateList[0].split('-')}<button>미래로</button></div>
            <div className='w-full child-[span]:text-[13px]'>
                <span>월</span>
                <span>화</span
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                >
                <span>수</span>
                <span>목</span>
                <span>금</span>
                <span>토</span>
                <span>일</span>
            </div>
            {dateList.map((item, index) => (
                <CustomCalendarItem selectDate={item} key={index} />
            ))}
        </div>
    )   
};

export default CustomCalendar;