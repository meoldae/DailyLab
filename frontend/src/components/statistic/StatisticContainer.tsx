import React, { useState } from 'react';
import DailyChart from "../chart/emotion/daily/DailyChart";
import Todo from './todo/Todo';
// import CategoryChart from "./todo/CategoryChart";
// import TasteChart from "./TasteChart";
import Taste from './taste/Taste';

const StatisticContainer = ({state, period, startDate, endDate}: {state:string, period:string, startDate:string, endDate:string}) => {
    const [mostFrequentEmotion, setMostFrequentEmotion] = useState<string | null>("계산중..");
    
    const handleMostFrequentEmotion = (emotion: string) => {
        setMostFrequentEmotion(emotion);
    };

    return (
        <>
            <div className="pt-1 child-[div]:mb-[30px]">
                {/* 소통 통계 (바 차트) */}
                <Todo state={state} period={period} startDate={startDate} endDate={endDate}/>
                {/* 맛 통계 (도넛 차트) */}
                <Taste state={state} period={period} startDate={startDate} endDate={endDate}/>
                {/* 감정 통계 */}
                <div className="pt-[40px]">
                    <div className="text-center font-semibold text-2xl mb-8">
                        이번 {period === 'month' ? '달의' : '주의'} 가장 많이 느낀 감정은 <p className="inline-block font-black">{mostFrequentEmotion}</p> 입니다
                    </div>
                    <DailyChart state={state} period={period} startDate={startDate} endDate={endDate} onMostFrequentEmotion={handleMostFrequentEmotion}/>
                </div>
            </div>
        </>
    )
}

export default StatisticContainer;