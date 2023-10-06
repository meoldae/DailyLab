import Tab, {TabType} from '@/utils/tab/Tab';
import StatisticContainer from './StatisticContainer';
import { useEffect, useState } from 'react';
import { toStringByFormatting } from '@/utils/date/DateFormatter';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from 'date-fns';


const Statistic = () => {
    const initIdx = 0;
    const TabContents = [] as TabType[];
    const [period, setPeriod] = useState('week');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const getStartAndEndDates = (period: string) => {
        const today = new Date();
        
        if (period === 'week') {
            // 이전 주의 시작 (월요일)과 끝 (일요일)을 찾기.
            const startOfLastWeek = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
            const endOfLastWeek = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
            
            return {
                startDate: toStringByFormatting(startOfLastWeek),
                endDate: toStringByFormatting(endOfLastWeek)
            };
        } else if (period === 'month') {
            // 이전 달의 시작 (1일)과 끝 (마지막 일)을 찾기.
            const startOfLastMonth = startOfMonth(subMonths(today, 1));
            const endOfLastMonth = endOfMonth(subMonths(today, 1));
            
            return {
                startDate: toStringByFormatting(startOfLastMonth),
                endDate: toStringByFormatting(endOfLastMonth)
            };
        }

        return {
            startDate: '',
            endDate: ''
        }
    };

    const handlePeriod = () => {
        setPeriod(period === 'month' ? 'week' : 'month');
    }
    
    useEffect(() => {
        const dates = getStartAndEndDates(period);
        setStartDate(dates.startDate);
        setEndDate(dates.endDate);
    },[period])
    
    TabContents.push({title : "개인", contents: <StatisticContainer state="personal" period={period} startDate={startDate} endDate={endDate}/>});
    TabContents.push({title : "연령대", contents: <StatisticContainer state="ageGender" period={period} startDate={startDate} endDate={endDate}/>});
    TabContents.push({title : "전체", contents:<StatisticContainer state="total" period={period} startDate={startDate} endDate={endDate}/>});
    
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
