import CheckboxAdd from "@/utils/checkbox/CheckboxAdd";
import CheckboxList from "@/utils/checkbox/CheckboxList";
import { useState } from "react";

const MainPrepare = ({curDate} : {curDate : string}) => {
    const [comp, setComp] = useState("closed")
    
    return (
        <div className="text-center text-2xl font-semibold
        child-[div:not(:last-child)]:mb-12">
            {/* 추천 체크리스트 목록 */}
            <div className="text-right">
                <div className='flex items-center'>
                    <img className='w-[90px]' src="src/resources/img/character/ian.png" alt="이안" />
                    <p className="">다음에는 이런 일 어때요?</p>
                </div>
                <div className='relative -mt-12 mb-4'>
                    <CheckboxList type='plan' date={curDate}/>
                </div>
                {comp === 'closed' ? (
                    <button className="mr-4 w-28 h-10 bg-text text-primary rounded-xl"
                    onClick={() => {setComp("opened");}}>
                        추가
                    </button>
                ) : (
                    <button className="mr-4 w-28 h-10 bg-text text-primary rounded-xl"
                    onClick={() => {setComp("closed");}}>
                        닫기
                    </button>
                )}
            </div>
            {/* 사용자 설정 체크리스트 등록 */}
            {comp === 'opened' && (
                <CheckboxAdd/>
            )}
            {/* 버튼 */}
            <div className='m-auto w-72 h-20 bg-text rounded-2xl flex items-center justify-center'>
                    <p className='text-primary'>오늘 하루 마무리</p>
            </div>
        </div>
    )
}

export default MainPrepare;