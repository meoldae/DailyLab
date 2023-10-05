import { GetMode } from "@/atom/modeAtom";
import { cocoImg } from "@/components/character/Character";

const ScheduleTutorial = () => {
    return(
        <>
            <div className="text-center p-[20px] font-semibold text-[24px] mt-[20px]">
                <span className="text-red">나의 기록 </span>돌아보기
            </div>
            <div className="bg_contents_con p-[20px] h-[50vh] flex items-center">
                <img className="w-full" src={GetMode() === 'dark' ? "./assets/img/tutorial/schedule_dark.png" : "./assets/img/tutorial/schedule_light.png"} alt="" />
            </div>
            {/* 설명 부분 */}
            <div className="flex text-center items-center">
                <img className="w-[150px] -mt-[20px] -mr-[30px]" src={cocoImg} alt="" />
                <span className="-mt-[20px] text-2xl !font-semibold">하단의 달력 아이콘을 눌러<br/>이전의 보고서를 확인하고,<br/>미래의 할 일을 미리 입력할 수 있어요</span>
            </div>
        </>
    )
}

export default ScheduleTutorial;