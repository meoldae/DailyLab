import Header from '../inc/Header';
import Footer from '../inc/Footer';
import CheckboxList from '@/utils/checkbox/CheckboxList';
import Emotion from './emotion/Emotion';
import { useState } from 'react';

const Current = () => {
    const [emotionCnt, setEmotionCnt] = useState(0);

    const handleEmotionClick = ():void => {
        setEmotionCnt(emotionCnt + 1);
    }

    return (
        <div className='px-8'>
            <Header/>
            <div className='text-center text-2xl font-semibold h-screen my-4
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
                        <CheckboxList/>
                    </div>
                </div>
                {/* 일기영역 */}
                <div>
                    <img className='w-[90px] m-auto' src="src/resources/img/character/diego.png" alt="디에고" />
                    <div className='relative -mt-[40px] bg-primary h-20 rounded-2xl flex items-center justify-center'>
                        <p>오늘의 일기를 확인해볼까요</p>
                    </div>
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
                <div className='w-72 h-20 bg-text rounded-2xl flex items-center justify-center'>
                    <p className='text-primary'>오늘 하루 마무리</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Current;