import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import MainProceed from "./proceed/Proceed";
import MainFinish from "./finish/Finish";
import { toStringByFormatting } from '@/utils/date/DateFormatter';

/*
 * 임시로 status를 세가지 경우로 나누어 분기처리 
 * prepare : 하루 마무리/미래 계획하기 단계 (하루 시작 전과 마무리 후)
 * proceed : 하루 진행 단계
 * loading : 하루 마무리 버튼을 누른 직후 일기 작성을 기다리는 단계
 */
// const status = 'inProgress';


const Main = () => {
    const status = 'proceed';
    const comp = 'result';
    const curDate = toStringByFormatting(new Date());

    return (
        <>
            {status == "proceed" ? <MainProceed curDate={curDate}/> : <MainFinish comp={comp} curDate={curDate}/>}
        </>
    )
}

export default Main;