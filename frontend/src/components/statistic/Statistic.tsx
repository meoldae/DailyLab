import Tab, {TabType} from '@/utils/tab/Tab';
import StatisticContainer from './StatisticContainer';
import { useEffect, useState } from 'react';
import { toStringByFormatting } from '@/utils/date/DateFormatter';
import { subDays } from 'date-fns';


const Statistic = () => {
    const initIdx = 0;
    const TabContents = [] as TabType[];
    const [period, setPeriod] = useState('month');
    const [startDate, setStartDate] = useState(toStringByFormatting(subDays(new Date(), 30)));
    const [endDate, setEndDate] = useState(toStringByFormatting(new Date()));
    
    TabContents.push({title : "개인", contents: <StatisticContainer state="personal" period={period} startDate={startDate} endDate={endDate}/>});
    TabContents.push({title : "연령대", contents: <StatisticContainer state="ageGender" period={period} startDate={startDate} endDate={endDate}/>});
    TabContents.push({title : "전체", contents:<StatisticContainer state="total" period={period} startDate={startDate} endDate={endDate}/>});


    const handlePeriod = () => {
        setPeriod(period === 'month' ? 'week' : 'month');
    }

    useEffect(() => {
        period === 'month' ?
        setStartDate(toStringByFormatting(subDays(new Date(), 30))) :
        setStartDate(toStringByFormatting(subDays(new Date(), 7)))
    },[period])
    
    return (
        <div className='contents_wrap'>
            <div className="text-center">
                <p className="text-3xl font-semibold mb-4">
                {period === 'month' ? '월간 보고서' : '주간 보고서'}
                </p>
                <div className="text-right">
                    <button onClick={handlePeriod}>
                        <div className="-mt-4 mb-8 mr-8 px-4 h-[25px] rounded-xl flex items-center justify-center bg-gray text-primary font-semibold text-xl">
                            {period === 'month' ? '주간 변경' : '월간 변경'}
                        </div>
                    </button>
                </div>
            </div>
            <div className="bg_contents_con p-[20px]">
                <Tab initIdx={initIdx} TabList={TabContents}/>
            </div>
        </div>
    )
}

export default Statistic;
