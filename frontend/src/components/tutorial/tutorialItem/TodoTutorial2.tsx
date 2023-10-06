import { GetMode } from "@/atom/modeAtom";
import { ian2Img } from "@/components/character/Character";

const TodoTutorial2 = () => {
    return(
        <>
            <div className="text-center p-[20px] font-semibold text-[24px] mt-[20px]">
                <span className="text-orange">할일 추천</span>하기
            </div>
            <div className="bg_contents_con p-[20px] h-[50vh] flex items-center">
                <img className="w-full" src={GetMode() === 'dark' ? "./assets/img/tutorial/todo2_dark.png" : "./assets/img/tutorial/todo2_light.png"} alt="" />
            </div>
            {/* 설명 부분 */}
            <div className="flex text-center items-center -mt-[30px]">
                <img className="w-[120px]" src={ian2Img} alt="" />
                <span className="mt-[20px] text-2xl !font-semibold">체크한 일의 카테고리에 따라<br/><span className="text-blue !font-black">연구원</span>이 격려해요!</span>
            </div>
        </>
    )
}

export default TodoTutorial2;