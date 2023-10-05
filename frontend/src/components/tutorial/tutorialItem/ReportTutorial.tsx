import { GetMode } from "@/atom/modeAtom";
import { diego2Img } from "@/components/character/Character";

const ReportTutorial = () => {
    return(
        <>
            <div className="text-center p-[20px] font-semibold text-[24px] mt-[20px]">
                <span className="text-blue">연구 보고서</span>받기
            </div>
            <div className="bg_contents_con p-[20px] h-[50vh] flex items-center">
                <img className="w-full" src={GetMode() === 'dark' ? "./assets/img/tutorial/report_dark.png" : "./assets/img/tutorial/report_light.png"} alt="" />
            </div>
            {/* 설명 부분 */}
            <div className="flex text-center items-center">
                <img className="w-[130px] -mt-[30px]" src={diego2Img} alt="" />
                <span className="mt-[20px] text-2xl !font-semibold"><span className="text-blue !font-black">하루 마무리</span> 버튼을 누르면<br/>일정 시간이 지난 후<br/>연구 보고서를 확인할 수 있어요!</span>
            </div>
        </>
    )
}

export default ReportTutorial;