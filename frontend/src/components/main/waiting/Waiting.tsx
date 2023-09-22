import { getStatus } from "@/api/User";
import { useEffect } from "react";

const MainWaiting = ({getDate, curDate} : {getDate : string, curDate : string}) => {

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data;
            console.log('현재 상태 : ', nowState)

        }, (error) => {
            console.log(error)
        });
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
        </div>
    )
}

export default MainWaiting;