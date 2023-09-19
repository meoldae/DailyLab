import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import MainCurrent from "./Current";
import MainResult from "./Result";
import { toStringByFormatting } from '@/utils/date/DateFormatter';
import MainPrepare from './Prepare';
import { useState } from 'react';

const Main = () => {
    const curDate = toStringByFormatting(new Date());
    const [comp, setComp] = useState("Result")
    
    return (
        <>
            <Header />
            {status === 'inProgress' ? (
                <MainCurrent curDate={curDate}/>
            ) : (status === 'prepare' ? (
                <div className='contents_wrap'>
                    <div className='m-auto mb-12 text-2xl flex w-80 justify-between'>
                        <div className={comp === 'Result' && "text-red font-extrabold underline underline-offset-8"} onClick={() => {setComp("Result");}}>
                            하루 마무리
                        </div>
                        <div className={comp === 'Prepare' && "text-red font-extrabold underline underline-offset-8"} onClick={() => {setComp("Prepare");}}>
                            미래 계획하기
                        </div>
                    </div>
                    {comp === 'Result' && (<MainResult curDate={curDate} />)}
                    {comp === 'Prepare' && (<MainPrepare curDate={curDate} />)}
                </div>
            ) : (
                <div></div>
            ))}
            <Footer />
        </>
    )
}

/*
 * 임시로 status를 세가지 경우로 나누어 분기처리 
 * prepare : 하루 마무리/미래 계획하기 단계 (하루 시작 전과 마무리 후)
 * inProgress : 하루 진행 단계
 * loading : 하루 마무리 버튼을 누른 직후 일기 작성을 기다리는 단계
 */
// const status = 'inProgress';
const status = 'prepare';

export default Main;