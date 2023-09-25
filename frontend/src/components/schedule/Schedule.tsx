import { useState, useEffect } from 'react';
import CustomCalendar from '@/utils/calendar/CustomCalendar';
import { getMonthFirstDate, getMonthLastDate, toStringByFormatting } from '@/utils/date/DateFormatter';
import { getMonthScheduleList } from '@/api/Schedule';
import { ScheduleType } from '@/type/ScheduleType';
import ScheduleItem from './item/ScheduleItem';
import ScheduleView from './ScheduleView';

const Schedule = () => {

    const [curDate, setCurDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState("");
    const [curMonth, setCurMonth] = useState<number>(curDate.getMonth() + 1);
    const [firstDate, setFirstDate] = useState<Date>(new Date(curDate.getFullYear(), curDate.getMonth(), 1));
    const [lastDate, setLastDate] = useState<Date>(new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0));
    const [dateContentsList, setDateContentsList] = useState<JSX.Element[]>([]);

    const getDateConentsList = async () => {
        await getMonthScheduleList(
            {startDay : toStringByFormatting(firstDate), endDay : toStringByFormatting(lastDate)},
            ({data}) => {
                const elementList:JSX.Element[] = [];
                const dataList:ScheduleType[] = data.data as ScheduleType[];
                dataList.map((item) => {
                    const clickStatus = item.status === "finish";
                    elementList.push(<ScheduleItem dateText={item.selectedDate} clickStatus={clickStatus} clickEvent={selectDateClickEvent} />);
                });
                setDateContentsList(() => elementList);
            }, (error) => console.log(error));
    }

    function selectDateClickEvent(selectDate: string) {
        setSelectedDate(() => selectDate);
    }

    useEffect(() => {
        setCurMonth(() => curDate.getMonth() + 1);
        setFirstDate(() => getMonthFirstDate(curDate));
        setLastDate(() => getMonthLastDate(curDate));
    }, [curDate]);

    useEffect(() => {
        getDateConentsList();
    },[firstDate, lastDate]);

    function prevMonthEvent(){
        const prevMonth = new Date(curDate);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setCurDate(() => prevMonth);
        setSelectedDate(() => "");
    }

    function nextMonthEvent(){
        const nextMonth = new Date(curDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurDate(() => nextMonth);
        setSelectedDate(() => "");
    }

    return (
        <>
            <CustomCalendar curMonth={curMonth!} firstDate={firstDate!} lastDate={lastDate!} dateContents={dateContentsList} prevMonthEvent={prevMonthEvent} nextMonthEvent={nextMonthEvent} />
            {selectedDate != "" ? <ScheduleView selectedDate={selectedDate} /> : null}
        </>
    )
}

export default Schedule;