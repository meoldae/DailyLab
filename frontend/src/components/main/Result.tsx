import DailyChart from "@/components/chart/emotion/daily/DailyChart";

const MainResult = ({curDate} : {curDate : string}) => {
    return (
        <div className="contents_wrap">
            {/** 차트 부분 */}
            <div className="bg_contents_con p-[20px]">
                <DailyChart selectDate={curDate} />
            </div>
        </div>
    )
}

export default MainResult;