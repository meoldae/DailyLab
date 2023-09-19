import DailyChart from "@/components/chart/emotion/daily/DailyChart";

const MainResult = () => {
    return (
        <div className="contents_wrap">
            {/** 차트 부분 */}
            <div className="bg_contents_con p-[20px]">
                <DailyChart />
            </div>
        </div>
    )
}

export default MainResult;