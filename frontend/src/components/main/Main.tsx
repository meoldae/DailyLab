import MainProceed from "./proceed/Proceed";
// import MainFinish from "./finish/Finish";
import { toStringByFormatting, differDate } from '@/utils/date/DateFormatter';
import MainWaiting from "./waiting/Waiting";
import { useEffect, useState } from "react";
import { getStatus } from "@/api/User";
import MainResult from "./Result";
import { setStatusProceed } from "@/api/Status";
import { useNavigate } from "react-router";

/*
 * 사용자의 status를 세가지 경우로 나누어 분기처리 
 * finish : 보고서 단계
 * proceed : 하루 진행 단계
 * waiting : 하루 마무리 버튼을 누른 후 보고서 작성을 기다리는 단계
 */

interface StatusType {
    date: string;
    status: string;
  }

const Main = () => {
    
    const [status, setStatus] = useState("proceed");
    const [getDate, setGetDate] = useState('');
    const curDate = toStringByFormatting(new Date());
    const navigator = useNavigate();

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data as StatusType;

            if(nowState.status === 'init'){
                navigator('/tutorial');
            }

            const curDate2: Date = new Date(curDate);
            const getDate2: Date = new Date(nowState.date);
            
            const timeDifference: number = differDate(curDate2, getDate2);
            if(timeDifference != 0){
                if(timeDifference != 1 || nowState.status != "proceed") void setNewStatus(curDate);
            } else {
                setStatus(() => nowState.status);
                setGetDate(() => nowState.date);
            }
        }, (error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        void nowStatus();
    }, [getDate]);

    const setNewStatus = async (date : string) => {
        await setStatusProceed(date, ({data}) => {
            setStatus(() => "proceed");
            setGetDate(() => date);
        }, (error) => {console.log(error)})
    }
    
    return (
        <>
            {status === 'proceed' && (<MainProceed getDate={getDate} curDate={curDate}/>)}
            {(status === 'wait' || status === 'complete') && (<MainWaiting getDate={getDate} />)}
            {status === 'finish' && (<MainResult getDate={getDate} curDate={curDate}/>)}
        </>
    )
}

export default Main;