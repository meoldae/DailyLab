import DailyChart from "../chart/emotion/daily/DailyChart";
import CategoryChart from "./CategoryChart";
import TasteChart from "./TasteChart";

const Statistic = () => {
    return (
        <>
            <div className="text-center">
                <p className="text-3xl font-semibold mb-4">월간 보고서</p>
                <p className="text-xl font-light">지영님과 비슷한 성향의 사용자들을 연구했어요</p>
                <p className="text-xl font-light mb-4">연구대상 : 20대 여성 / 내향적 / 감각적 / 사고적 / 인식적</p>
            </div>
            <div className="bg_contents_con p-[20px] child-[div:not(:last-child)]:mb-[40px]">
                {/* 소통 통계 (바 차트) */}
                <div className="mt-[20px]">
                    <div className="text-center font-semibold text-2xl -mb-4">
                        이번 달은 소통에 관한 일이 많았어요
                    </div>
                    <CategoryChart/>
                </div>
                {/* 맛 통계 (도넛 차트) */}
                <div>
                    <div className="text-center font-semibold text-2xl mb-4">
                        이번 달은 단맛이 많이 검출되었어요
                    </div>
                    <TasteChart/>
                    <img className="w-[130px] -mt-[170px] m-auto" src="./assets/img/character/cloe.png" alt="" />
                    <div className="text-center font-light text-2xl">
                        그중에서도 많이 검출된 맛은<br/>
                        <p className="font-semibold inline-block">딸기파르페맛</p> 이에요!
                    </div>
                </div>
                {/* 감정 통계 */}
                <div className="pt-[30px]">
                    <div className="text-center font-semibold text-2xl mb-4">
                        이번 달은 분노를 가장 많이 느꼈어요
                    </div>
                    <DailyChart selectDate='2023-09-26' />
                </div>
            </div>
        </>
    )
}

export default Statistic;