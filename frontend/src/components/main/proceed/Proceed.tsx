import CheckboxList from '@/components/checkbox/CheckboxList';
import Emotion from './emotion/Emotion';
import { useEffect, useState } from 'react';
import { getDailyData, putEmotion } from '@/api/Emotion';
import { addHours } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const MainProceed = ({curDate} : {curDate : string}) => {
    const [emotionCnt, setEmotionCnt] = useState(0);

    
    const handleTodayDiary = () => {

    }

    const handleEmotionClick = (emotionId: number):void => {
        updateEmotion(emotionId);// 클릭된 감정의 ID를 상태에 저장
    }

    const handleFinishButton = () => {
        // 하루 마무리 요청 API 호출
    }

    const updateEmotion = async (emotionId : number) => {
        const now = new Date();
        const newDate = addHours(now, 9);
        const formattedDateTime = newDate.toISOString().slice(0, 16).replace("T", " ");

        console.log(emotionId, formattedDateTime)
        const emotionData = {
            emotionId: emotionId,
            timeStamp: formattedDateTime
        };

        await putEmotion(emotionData,({ data }) => {
            console.log(data);
            setEmotionCnt(emotionCnt + 1);
        }, (error) => {console.log(error)});

    };
    
    // 누적된 감정 갯수 조회 
    const getData = async () => {
        await getDailyData({date : curDate}, ({data}) => {
            setEmotionCnt(() => data.data.length);
        }, (error) => {console.log(error)});
    };

    
    useEffect(() => {
        void getData();
    }, []);

    return (
        <div className='contents_wrap'>
            <div className='text-center text-2xl font-semibold
            child-[div:not(:last-child)]:mb-12
            child-[div]:m-auto child-[div]:max-w-xl'>
                <p className='mb-8'>
                    오늘 하루도 화이팅이에요!
                </p>
                {/* TODO영역 */}
                <div>
                    <div className='flex items-center'>
                        <img className='w-[90px]' src="src/resources/img/character/ian.png" alt="이안" />
                        <p>당신을 위한 오늘의 할일...</p>
                    </div>
                    <div className='relative -mt-12'>
                        <CheckboxList type='default'/>
                    </div>
                </div>
                {/* 일기영역 */}
                <div>
                    <img className='w-[90px] m-auto' src="src/resources/img/character/diego.png" alt="디에고" />
                    <AnimatePresence>
                        <motion.div
                        
                        onClick={handleTodayDiary} className='relative -mt-[40px] bg_contents_con p-[20px] flex items-center justify-center'>
                            <p>오늘의 일기를 확인해볼까요</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                {/* 감정영역 */}
                <div>
                    <Emotion onEmotionClick={handleEmotionClick} />
                    <div className='flex items-center'>
                        <div className='ml-6 -mt-2 mr-4'>
                            <img className='w-[90px]' src="src/resources/img/character/cloe_basket.png" alt="" />
                            <p className='-mt-12 ml-2'>{emotionCnt}</p>
                        </div>
                        <p className='-mt-4'>지금은 어떤 기분인가요?</p>
                    </div>
                </div>
                {/* 버튼 */}
                <div onClick={handleFinishButton} className='w-72 h-20 bg-text rounded-2xl flex items-center justify-center'>
                    <p className='text-primary'>오늘 하루 마무리</p>
                </div>
            </div>
        </div>
    )
}

export default MainProceed;