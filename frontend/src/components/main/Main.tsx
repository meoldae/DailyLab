import MainProceed from "./proceed/Proceed";
// import MainFinish from "./finish/Finish";
import { toStringByFormatting } from '@/utils/date/DateFormatter';
import MainWaiting from "./waiting/Waiting";
import { useEffect, useState } from "react";
import { getStatus } from "@/api/User";
import MainResult from "./Result";

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
    const [status, setStatus] = useState('proceed');
    const [getDate, setGetDate] = useState('');
    // const comp = 'result';
    const curDate = toStringByFormatting(new Date());

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data as StatusType;
            setStatus(() => nowState.status);
            if(nowState.status !== 'init'){
                setGetDate(() => nowState.date);
                getDateDiff();
            }
        }, (error) => {
            console.log(error)
        });
        
        //임의로 추가함!!!!!!!!!!!!!!!!!
        setStatus('proceed');
    }
    
    const getDateDiff = () => {
        const curDate2: Date = new Date(curDate);
        const getDate2: Date = new Date(getDate);
        const timeDifference: number = (curDate2.getDate() - getDate2.getDate());

        if(timeDifference >= 1){
            setStatus('proceed');
        }
    }
    
    useEffect(() => {
        void nowStatus();
    },)
    
    return (
        <>
            {status === 'proceed' && (<MainProceed getDate={getDate} curDate={curDate}/>)}
            {(status === 'wait' || status === 'complete') && (<MainWaiting getDate={getDate} curDate={curDate}/>)}
            {status === 'finish' && (<MainResult getDate={getDate} curDate={curDate}/>)}
        </>
    )
}

export default Main;