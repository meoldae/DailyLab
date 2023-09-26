import CheckboxList from '@/components/checkbox/CheckboxList';
import { useEffect, useState } from 'react';
import { addHours } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { postTodayDiary } from '@/api/diary';


const MainProceed = ({ getDate, curDate} : { getDate : string, curDate : string}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    // const [emotionCnt, setEmotionCnt] = useState(0);
    // const [todayDiary, setTodayDiary] = useState<DiaryType>();

    const handleDiaryContents = () => {
        setIsOpen(!isOpen);
    }

    const getNewDiary = async () => {
        await postTodayDiary(curDate ,({ data }) => {
        console.log(data);
        }, (error) => {console.log(error)});
    }

    const handleFinishButton = () => {
        // 하루 마무리
        //오늘 일기 생성
        getNewDiary();
        navigate('/loading');
    }
    
    useEffect(() => {
    
    }, []);

    return (
        <div className='contents_wrap'>
            <div className='text-center text-2xl font-semibold
            child-[div:not(:last-child)]:mb-12
            child-[div]:m-auto child-[div]:max-w-xl'>
                 {/* 안내멘트 영역 */}
                 <div>
                    <img className='w-[90px] m-auto' src="./assets/img/character/diego.png" alt="디에고" />
                    <div onClick={handleDiaryContents} className='relative -mt-[40px] bg_contents_con p-[20px] flex flex-wrap items-center justify-center'>
                           <p>{curDate}을 연구중이에요(포맷바꾸기)</p>
                    </div>
                </div>
                {/* TODO영역 */}
                <div>
                    <div className='flex items-center justify-end'>
                        <p>당신을 위한 오늘의 할일...</p>
                        <img className='w-[90px]' src="./assets/img/character/ian.png" alt="이안" />
                    </div>
                    <div className='relative -mt-12'>
                        <CheckboxList type='default' date={curDate}/>
                    </div>
                </div>
                {/* 감정 선택 버튼 영역 */}
                <div onClick={() => navigate('/emotion')} className='bg_contents_con p-[10px]'>
                    <div className='flex items-center justify-between'>
                        <img className='w-[70px]' src="./assets/img/character/cloe_2.png" alt="" />
                        <div className='text-left'>
                            <p className='font-light mb-2'>점심은 맛있게 드셨나요?</p>
                            <p>지금 느끼는 기분을 알려주세요!</p>
                        </div>
                        <img className='mr-[10px] w-[25px]' src="./assets/img/icon/arrow_right.png" alt="" />
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