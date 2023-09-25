import { useState, useEffect } from 'react';
import CustomCalendar from '@/utils/calendar/CustomCalendar';
import { toStringByFormatting } from '@/utils/date/DateFormatter';
import ScheduleItem from './item/ScheduleItem';

const Schedule = () => {

    const [curDate, setCurDate] = useState<Date>(new Date());
    const [curMonth, setCurMonth] = useState<number>(curDate.getMonth() + 1);
    const [firstDate, setFirstDate] = useState<Date>(new Date(curDate.getFullYear(), curDate.getMonth(), 1));
    const [lastDate, setLastDate] = useState<Date>(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0));
    const [dateList, setDateList] = useState<JSX.Element[]>([]);

    const getDateList = async () => {
        const result:JSX.Element[] = [];
        const tempFirstDate = new Date(firstDate);
        const tempLastDate = new Date(lastDate);
        while(tempFirstDate.getTime() != tempLastDate.getTime()){
            result.push(<ScheduleItem dateText={tempFirstDate.getDate()}/>);
            tempFirstDate.setDate(tempFirstDate.getDate() + 1);
        }
        result.push(<ScheduleItem dateText={tempLastDate.getDate()}/>);
        setDateList(() => result);
    }

    useEffect(() => {
        setCurMonth(() => curDate.getMonth() + 1);
        const initDateYear = curDate.getFullYear();
        const initDateMonth = curDate.getMonth();
        setFirstDate(() => new Date(initDateYear, initDateMonth, 1));
        setLastDate(() => new Date(initDateYear, initDateMonth + 1, 0));
    }, [curDate]);

    useEffect(() => {
        getDateList();
    },[firstDate, lastDate]);

    function prevMonthEvent(){
        const prevMonth = new Date(curDate);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setCurDate(() => prevMonth);
    }

    function nextMonthEvent(){
        const nextMonth = new Date(curDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurDate(() => nextMonth);
    }

    return (
        <>
            <CustomCalendar curMonth={curMonth!} firstDate={firstDate!} lastDate={lastDate!} dateContents={dateList} prevMonthEvent={prevMonthEvent} nextMonthEvent={nextMonthEvent} />
        </>
    )
}

export default Schedule;