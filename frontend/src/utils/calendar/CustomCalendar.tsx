import { useState, useEffect } from 'react';
import CustomCalendarItem from './item/CustomCalendarItem';
import { toStringByFormatting } from '@/utils/date/Date';

interface CalendarProps {
    initDate : string
}

const CustomCalendar = (props : CalendarProps) => {
    const initDateTemp = new Date(props.initDate);
    const initDateYear = initDateTemp.getFullYear();
    const initDateMonth = initDateTemp.getMonth();
    const [firstDate, setFirstDate] = useState<Date>(new Date(initDateYear, initDateMonth, 1));
    const [lastDate, setLastDate] = useState<Date>(new Date(initDateYear, initDateMonth + 1, 0));
    function getDateList():string[] {
        const result = [];
        const tempFirstDate = firstDate;
        const tempLastDate = lastDate;
        while(tempFirstDate != tempLastDate){
            result.push(toStringByFormatting(tempFirstDate));
            tempFirstDate.setDate(tempFirstDate.getDate() + 1);
        }
        result.push(toStringByFormatting(tempLastDate));
        return result;
    }
    const [dateList, setDateList] = useState<string[]>(['2023-09-10', '2023-09-11']);

    

    return (
        <div>
            캘린더 
            {dateList.map((item, index) => (
                <CustomCalendarItem selectDate={item} key={index} />
            ))}
        </div>
    )   
};

export default CustomCalendar;