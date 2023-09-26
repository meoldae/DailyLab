import { useState } from 'react';
import CustomDatePicker from "@/utils/CustomDatePicker";
import { fromStringtoDate } from '@/utils/date/DateFormatter';

const SetPeriod = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 1);
    const initFirstDate = new Date();
    initFirstDate.setDate(initFirstDate.getDate() - 7);
    const [startDate, setStartDate] = useState<Date>(initFirstDate);
    const [endDate, setEndDate] = useState<Date>(maxDate);

    function changeStartDate(date: string){setStartDate(() => fromStringtoDate(date));}
    function changeEndDate(date: string){setEndDate(() => fromStringtoDate(date));}

    return (
        <>
            <div className="text-[15px] font-semibold">날짜 설정</div>
            <CustomDatePicker setData={changeStartDate} settingDate={startDate} maxDate={maxDate}/>
            <CustomDatePicker setData={changeEndDate} settingDate={endDate} maxDate={maxDate}/>
        </>
    )
}

export default SetPeriod;