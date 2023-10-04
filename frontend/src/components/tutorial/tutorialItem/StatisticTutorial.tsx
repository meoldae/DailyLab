import { GetMode } from "@/atom/modeAtom";
import { cocoImg } from "@/components/character/Character";

const StatisticTutorial = () => {
    return(
        <>
            <div className="text-center p-[20px] font-semibold text-[24px] mt-[20px]">
                <span className="text-red">통계 </span>확인하기
            </div>
            <div className="bg_contents_con p-[20px] h-[45vh] pt-[30px]">
                <div>
                    <img className="m-auto h-[35vh]" src={GetMode() === 'dark' ? "./assets/img/tutorial/statistic_dark.png" : "./assets/img/tutorial/statistic_light.png"} alt="" />
                </div>
            </div>
            {/* 설명 부분 */}
            <div className="flex text-center items-center">
                <img className="w-[150px] -mt-[20px] -mr-[30px]" src={cocoImg} alt="" />
                <span className="-mt-[20px] text-2xl !font-light">하단의 통계 아이콘을 눌러<br/>월간, 주간 보고서를 확인해요</span>
            </div>
        </>
    )
}

export default StatisticTutorial;