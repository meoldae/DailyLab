import DailyChart from "@/components/chart/emotion/daily/DailyChart";
import Diary from "@/components/diary/Diary";

const MainResult = ({curDate} : {curDate : string}) => {
    return (
        <div className="text-center">
            {/* 일기 부분 */}
            <div className="mb-12">
                <Diary date={curDate}/>
            </div>
            {/* 차트 부분 */}
            <div className="flex justify-end items-center pr-[10px]">
                <p className="-mt-4 text-2xl font-semibold">오늘의 감정을 정리해봤어요.</p>
                <img className="w-[90px]" src="./assets/img/character/cloe_2.png" alt="클로에"/>
            </div>
            <div className="-mt-[30px] relative bg_contents_con p-[20px]">
                <DailyChart selectDate={curDate} />
            </div>
        </div>
    )
}

export default MainResult;