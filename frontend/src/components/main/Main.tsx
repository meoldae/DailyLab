import Header from '../inc/Header';
import Footer from '../inc/Footer';
import CheckboxList from '@/components/main/checkbox/CheckboxList';
import Emotion from './emotion/Emotion';
import { useState } from 'react';

const Main = () => {
    const [emotionCnt, setEmotionCnt] = useState(0);

    const handleEmotionClick = ():void => {
        setEmotionCnt(emotionCnt + 1);
    }

    return (
        <div className='px-8'>
            <Header/>
            <div className='text-center text-2xl font-extrabold 
            child-[div:not(:last-child)]:mb-12
            child-[div]:m-auto child-[div]:max-w-xl'>
                <div className='mb-5'>
                    오늘 하루도 화이팅이에요!
                </div>
                {/* TODO영역 */}
                <div>
                    <div className='flex items-center'>
                        <img className='w-[80px]' src="src/resources/img/character/ian.png" alt="이안" />
                        <p>당신을 위한 오늘의 할일...</p>
                    </div>
                    <div className='relative -mt-12'>
                        <CheckboxList/>
                    </div>
                </div>
                {/* 일기영역 */}
                <div>
                    <img className='w-[80px] m-auto' src="src/resources/img/character/diego.png" alt="디에고" />
                    <div className='relative -mt-[30px] bg-primary h-20 rounded-2xl flex items-center justify-center'>
                        <div>오늘의 일기를 확인해볼까요</div>
                    </div>
                </div>
                {/* 감정영역 */}
                <div>
                    <Emotion onEmotionClick={handleEmotionClick} />
                    <div className='flex items-center'>
                        <div className='ml-6 -mt-2 mr-4'>
                            <img className='w-[80px]' src="src/resources/img/character/cloe_basket.png" alt="" />
                            <p className='-mt-12 ml-2'>{emotionCnt}</p>
                        </div>
                        <p className='-mt-4'>지금 어떤 기분인가요?</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Main;