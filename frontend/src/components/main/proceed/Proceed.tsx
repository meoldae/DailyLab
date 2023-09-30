import Todo from '@/components/todo/Todo';
import { diegoImg, ianImg, cloe2Img } from '@/components/character/Character';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postTodayDiary } from '@/api/diary';
import Emotion from '@/components/emotion/Emotion';


const MainProceed = ({ getDate, curDate} : { getDate : string, curDate : string}) => {
    const navigate = useNavigate();
    const [emotionMode, setEmotionMode] = useState(false);

    // 현재 시간을 구하는 함수
    const getCurrentHour = () => {
        const currentHour = new Date().getHours();
        return currentHour;
    }

    // 시간대에 따른 메시지를 반환하는 함수
    const getTimeBasedGreeting = () => {
        const hour = getCurrentHour();
        console.log(hour);
        if (hour >= 5 && hour < 12) {
            return '아침은 드셨나요?';
        } else if (hour >= 12 && hour < 18) {
            return '점심은 맛있게 드셨나요?';
        } else {
            return '어떤 저녁을 보내고 계신가요?';
        }
    }
    
    const getNewDiary = async () => {
        await postTodayDiary(curDate ,({ data }) => {
        console.log(data);
        }, (error) => {console.log(error)});
    }

    function changeEmotionMode() {
        setEmotionMode((prev) => !prev);
    }

    function handleFinish() {
        // 하루 마무리
        //오늘 일기 생성
        getNewDiary();
        navigate('/loading');
    }
    if(!emotionMode) {
        return (
            <div className='contents_wrap'>
                <div className='text-center text-2xl font-semibold child-[div:not(:last-child)]:mb-12 child-[div]:m-auto child-[div]:max-w-xl'>
                    {/* 안내멘트 영역 */}
                    <div>
                        <img className='w-[90px] m-auto' src={diegoImg} alt="디에고" />
                        <div className='relative -mt-[40px] bg_contents_con p-[20px] flex flex-wrap items-center justify-center'>
                            <p>{`${Number(getDate.split('-')[1])}월 ${Number(getDate.split('-')[2])}일`}의 연구를 진행중이에요</p>
                        </div>
                    </div>
                    {/* TODO영역 */}
                    <div>
                        <div className='flex items-center justify-end'>
                            <p>오늘은 이런 일 어떨까요?</p>
                            <img className='w-[90px]' src={ianImg} alt="이안" />
                        </div>
                        <div className='relative -mt-12'>
                            <Todo mode="current" date={curDate}/>
                        </div>
                    </div>
                    {/* 감정 선택 버튼 영역 */}
                    <div onClick={changeEmotionMode} className='bg_contents_con p-[10px]'>
                        <div className='flex items-center justify-between'>
                            <img className='w-[70px]' src={cloe2Img} alt="클로에" />
                            <div className='text-left'>
                                <p className='font-light mb-2'>{getTimeBasedGreeting()}</p>
                                <p>지금 느끼는 기분을 알려주세요!</p>
                            </div>
                            <img className='mr-[10px] w-[25px]' src="./assets/img/icon/arrow_right.png" alt="" />
                        </div>
                    </div>
                    {/* 버튼 */}
                    <div onClick={handleFinish} className='w-72 h-20 bg-text rounded-2xl flex items-center justify-center'>
                        <p className='text-primary'>하루 마무리</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Emotion changeMode={changeEmotionMode} />
    )

}

export default MainProceed;