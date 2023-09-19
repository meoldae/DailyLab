// import DailyChart from "@/components/chart/emotion/daily/DailyChart";

import Diary from "@/utils/diary/diary";

const MainResult = ({curDate} : {curDate : string}) => {
    return (
        <div className="text-center
        child-[div:not(:last-child)]:mb-12">
            {/* 일기 부분 */}
            <div>
                <Diary date={curDate}/>
            </div>
            {/* 차트 부분 */}
            <div className="bg_contents_con p-[20px]">
                {/* <DailyChart selectDate={curDate} /> */}
            </div>
        </div>
    )
}

export default MainResult;