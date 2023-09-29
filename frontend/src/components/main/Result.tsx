import { useEffect, useState } from "react";
import Report from "../report/Report";
import Taste from "../taste/Taste";
import { setStatusProceed } from "@/api/Status";

const MainResult = ({getDate, curDate} : {getDate : string, curDate : string}) => {
    const [isActiveButton, setIsActiveButton] = useState(false);

    const handleProceed = async (date : string) => {
        await setStatusProceed(date, ({data}) => {
            window.location.reload();
        }, (error) => {console.log(error)})
    }

    const handleStartDay = () =>{
        handleProceed(curDate);
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
    },[])
    
    return (
        <div className="contents_wrap">
            <div className="text-center
            child-[div:not(:last-child)]:mb-12">
                <div className="text-3xl font-semibold">
                    {`${Number(getDate.split('-')[1])}월 ${Number(getDate.split('-')[2])}일`}의 연구 보고서
                </div>
                {/* 일지 부분 */}
                <div>
                    <Report date={getDate}/>
                </div>
                {/* 맛 부분 */}
                <div>
                    <Taste date={getDate}/>
                </div>
                {/* 버튼 */}
            {isActiveButton ? (
                <div onClick={handleStartDay} className='m-auto w-72 h-20 bg-text rounded-2xl flex items-center justify-center'>
                    <p className='text-primary text-2xl'>새로운 하루 시작</p>
                </div>
            ) : (
                <div className='m-auto w-72 h-20 bg-gray rounded-2xl flex items-center justify-center'>
                    <p className='text-primary text-2xl'>내일까지 기다려주세요!</p>
                </div>
            )}
            </div>
        </div>
    )
}

export default MainResult;