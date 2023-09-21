import MainProceed from "./proceed/Proceed";
import MainFinish from "./finish/Finish";
import { toStringByFormatting } from '@/utils/date/DateFormatter';
import MainWaiting from "./waiting/Waiting";
import { useEffect, useState } from "react";
import { getStatus } from "@/api/User";

/*
 * 임시로 status를 세가지 경우로 나누어 분기처리 
 * finished : 하루 마무리/미래 계획하기 단계 (하루 시작 전과 마무리 후)
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
    const [status, setStatus] = useState('');
    const [getDate, setGetDate] = useState('');
    const comp = 'result';
    const curDate = toStringByFormatting(new Date());

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data as StatusType;
            setStatus(nowState.status);
            setGetDate(nowState.date);
            console.log('현재 상태 : ',data.data)
        }, (error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        void nowStatus();
    },[])
    
    return (
        <>
            {status === 'proceed' && (<MainProceed getDate={getDate} curDate={curDate}/>)}
            {status === 'wait' && (<MainWaiting getDate={getDate} curDate={curDate}/>)}
            {status === 'finish' && (<MainFinish comp={comp} getDate={getDate} curDate={curDate}/>)}
        </>
    )
}

export default Main;