import MainProceed from "./proceed/Proceed";
import MainFinish from "./finish/Finish";
import { toStringByFormatting } from '@/utils/date/DateFormatter';
import MainWaiting from "./waiting/Waiting";
import { useEffect, useState } from "react";
import { getStatus } from "@/api/User";
import MainPreview from "./Preview/Preview";

/*
 * 임시로 status를 세가지 경우로 나누어 분기처리 
 * finish : 하루 마무리/미래 계획하기 단계 (하루 시작 전과 마무리 후)
 * proceed : 하루 진행 단계
 * waiting : 하루 마무리 버튼을 누른 직후 일기 작성을 기다리는 단계
 */
// const status = 'inProgress';

interface StatusType {
    date: string;
    status: string;
  }

const Main = () => {
    // status 가져오는 API 
    const [status, setStatus] = useState('proceed');
    const [getDate, setGetDate] = useState('');
    const comp = 'result';
    const curDate = toStringByFormatting(new Date());

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data as StatusType;
            console.log("---------", nowState);
            setStatus(() => nowState.status);
            setGetDate(() => nowState.date);
        }, (error) => {
            console.log(error)
        });
    }
    
    const getDateDiff = () => {
        const curDate2: Date = new Date(curDate);
        const getDate2: Date = new Date(getDate);
        const timeDifference: number = (curDate2.getDate() - getDate2.getDate());

        console.log('날짜 차이 : ', curDate, getDate, timeDifference)

        if(timeDifference >= 2 || getDate === ''){
            setStatus('preview');
        }
    }
    
    useEffect(() => {
        void nowStatus();
        void getDateDiff();
    },[])
    
    return (
        <>
            {status === 'proceed' && (<MainProceed getDate={getDate} curDate={curDate}/>)}
            {status === 'wait' && (<MainWaiting getDate={getDate} curDate={curDate}/>)}
            {status === 'finish' && (<MainFinish comp={comp} getDate={getDate} curDate={curDate}/>)}
            {status === 'preview' && (<MainPreview getDate={getDate} curDate={curDate}/>)}

        </>
    )
}

export default Main;