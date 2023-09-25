import Diary from "@/components/diary/Diary";
import { useEffect, useState } from "react";

const MainResult = ({getDate, curDate} : {getDate : string, curDate : string}) => {
    const [isActiveButton, setIsActiveButton] = useState(false);

    const handleStartDay = () =>{
        // 업데이트된 state 확인하기 위한 새로고침
        location.reload();
    }

    useEffect(() => {
        // curDate와 getDate를 비교해서 같은 날이면 아무것도 작동하지 않게 막아야 함
        if(curDate === getDate){
            setIsActiveButton(false)
        }else{
            setIsActiveButton(true)
        }
        
        // 카테고리는 checkboxList에서 받아오게 바꾸기
        // void getCategory();
    },[])
    
    return (
        <div className="contents_wrap">
            <div className="text-center
            child-[div:not(:last-child)]:mb-12">
                {/* 일기 부분 */}
                <div>
                    <Diary date={curDate}/>
                </div>
                {/* 차트 부분 */}
                <div className="bg_contents_con p-[20px]">
                    {/* <DailyChart selectDate={curDate} /> */}
                </div>
                {/* 버튼 */}
            {isActiveButton ? (
                <div onClick={handleStartDay} className='m-auto w-72 h-20 bg-text rounded-2xl flex items-center justify-center'>
                    <p className='text-primary'>새로운 하루 시작</p>
                </div>
            ) : (
                <div className='m-auto w-72 h-20 bg-gray rounded-2xl flex items-center justify-center'>
                    <p className='text-primary'>내일까지 기다려주세요!</p>
                </div>
            )}
            </div>
        </div>
    )
}

export default MainResult;