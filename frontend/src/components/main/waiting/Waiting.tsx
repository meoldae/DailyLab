import { setStatusFinish } from "@/api/Todo";
import { getStatus } from "@/api/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StatusType {
    date: string;
    status: string;
  }

const MainWaiting = ({getDate, curDate} : {getDate : string, curDate : string}) => {
    const [status, setStatus] = useState('');
    const navigator = useNavigate();

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data as StatusType;
            console.log('현재 상태 : ', nowState)
            setStatus(nowState.status);
        }, (error) => {
            console.log(error)
        });
    }


    const handleFinish = async (date : string) => {
        await setStatusFinish(date, ({data}) => {
            navigator('/');
        }, (error) => {console.log(error)})
    }
    
    useEffect(() => {
        // 2초마다 상태 확인, 상태 finished이면 새로고침
        const interval = setInterval(() => {
            nowStatus();
          }, 2000);

          return () => clearInterval(interval);
    },[])
    
    return (
        <div>
            {curDate} 의 일기를 작성하고 있어요
            {status === 'complete' && (
                <div>
                    <button onClick={() => {handleFinish(curDate)}}>
                        보고서 확인하기
                    </button>
                </div>
            )}
        </div>
    )
}

export default MainWaiting;