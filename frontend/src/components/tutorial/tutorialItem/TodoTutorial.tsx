import { GetMode } from "@/atom/modeAtom";
import { ian2Img } from "@/components/character/Character";

const TodoTutorial = () => {
    return(
        <>
            <div className="text-center p-[20px] font-semibold text-[24px] mt-[20px]">
                <span className="text-orange">할일 추천</span>하기
            </div>
            <div className="bg_contents_con p-[20px] h-[50vh] flex items-center">
                <img className="w-full" src={GetMode() === 'dark' ? "./assets/img/tutorial/todo_dark.png" : "./assets/img/tutorial/todo_light.png"} alt="" />
            </div>
            {/* 설명 부분 */}
            <div className="flex text-center items-center -mt-[30px]">
                <img className="w-[120px]" src={ian2Img} alt="" />
                <span className="mt-[30px] text-2xl !font-semibold">오늘의 할 일을 추천해드려요!<br/>추천 항목에는 <span className="text-orange !font-black">테두리</span>가 있어요<br/>왼쪽으로 당겨서 삭제하거나<br/>관심없음을 설정할 수 있어요</span>
            </div>
        </>
    )
}

export default TodoTutorial;