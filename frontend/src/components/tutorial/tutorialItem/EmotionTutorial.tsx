import { GetMode } from "@/atom/modeAtom";
import { cloe2Img } from "@/components/character/Character";

const EmotionTutorial = () => {
    return(
        <>
            <div className="text-center p-[20px] font-semibold text-[24px] mt-[20px]">
                <span className="text-yellow">감정 입력</span>하기
            </div>
            <div className="bg_contents_con p-[20px] h-[50vh] flex items-center">
                <img className="w-full" src={GetMode() === 'dark' ? "./assets/img/tutorial/emotion_dark.png" : "./assets/img/tutorial/emotion_light.png"} alt="" />
            </div>
            {/* 설명 부분 */}
            <div className="flex text-center items-center">
                <img className="w-[90px]" src={cloe2Img} alt="" />
                <span className="mt-[20px] text-2xl !font-semibold">버튼을 누르면 감정을 입력할 수 있어요!<br/>감정들을 마구 눌러주세요<br/>감정에서 느껴지는 맛을 추출할게요</span>
            </div>
        </>
    )
}

export default EmotionTutorial;