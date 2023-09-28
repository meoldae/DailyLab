import DailyChart from "../chart/emotion/daily/DailyChart";
import CategoryChart from "./CategoryChart";
// import TasteChart from "./TasteChart";
import Taste from './taste/Taste';

const StatisticContainer = ({state, period, startDate, endDate}: {state:string, period:string, startDate:string, endDate:string}) => {
    console.log(state, startDate, endDate);
    return (
        <>
            <div className="pt-1 child-[div]:mb-[30px]">
                {/* 소통 통계 (바 차트) */}
                <div className="mt-[20px]">
                    <div className="text-center font-semibold text-2xl -mb-4">
                        이번 {period === 'month' ? '달은' : '주는'} <p className="inline-block font-black">소통</p>에 관한 일이 많았어요
                    </div>
                    <CategoryChart state={state} period={period} startDate={startDate} endDate={endDate}/>
                </div>
                {/* 맛 통계 (도넛 차트) */}
                <Taste state={state} period={period} startDate={startDate} endDate={endDate}/>
                {/* 감정 통계 */}
                <div className="pt-[40px]">
                    <div className="text-center font-semibold text-2xl mb-8">
                        이번 {period === 'month' ? '달의' : '주의'} 가장 많이 느낀 감정은 <p className="inline-block font-black">황당</p>이에요
                    </div>
                    <DailyChart state={state} period={period} startDate={startDate} endDate={endDate}/>
                </div>
            </div>
        </>
    )
}

export default StatisticContainer;