import DailyChart from "@/components/chart/emotion/daily/DailyChart";

const MainResult = () => {
    return (
        <div className="min-h-screen pb-[80px]">
            {/** 차트 부분 */}
            <div className="bg-primary p-[20px]">
                <DailyChart />
            </div>
        </div>
    )
}

export default MainResult;