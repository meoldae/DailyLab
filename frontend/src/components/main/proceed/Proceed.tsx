import CheckboxList from '@/components/checkbox/CheckboxList';
import Emotion from './emotion/Emotion';
import { useEffect, useState } from 'react';
import { getDailyData, putEmotion } from '@/api/Emotion';
import { addHours } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getPredictDiary, postTodayDiary } from '@/api/diary';
import { makePlanTodoList } from '@/api/Todo';

interface DiaryType { 
    title : string,
    content : string,
}

const MainProceed = ({ getDate, curDate} : { getDate : string, curDate : string}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [emotionCnt, setEmotionCnt] = useState(0);
    const [todayDiary, setTodayDiary] = useState<DiaryType>();

    const handleDiaryContents = () => {
        
        setIsOpen(!isOpen);
    }
    
    const getDiary = async () =>{
        await getPredictDiary(curDate, ({data}) => {
            setTodayDiary(data.data as DiaryType)
        }, (error) => {console.log(error)})
    }

    const getNewDiary = async () =>{
        await postTodayDiary(curDate, ({data}) => {
            console.log(data.data)
        }, (error) => {console.log(error)})
    }

    const getRecommendTodo = async () =>{
        await makePlanTodoList(curDate, ({data}) => {
            console.log(data.data)
        }, (error) => {console.log(error)})
    }

    const handleEmotionClick = (emotionId: number):void => {
        updateEmotion(emotionId);// 클릭된 감정의 ID를 상태에 저장
    }

    const handleFinishButton = () => {
        // 하루 마무리
        //추천 TODO List 생성
        getRecommendTodo();
        //오늘 일기 생성
        getNewDiary();
        navigate('/loading');
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
    
    // 23.09.24 강동표
    // 누적된 감정 갯수 조회 
    const getData = async () => {
        await getDailyData({date : curDate}, (data : any) => {
            setEmotionCnt(() => data.data.length);
        }, (error) => {console.log(error)});
    };

    
    useEffect(() => {
        void getData();
        void getDiary();
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
                        <img className='w-[90px]' src="./assets/img/character/ian.png" alt="이안" />
                        <p>당신을 위한 오늘의 할일...</p>
                    </div>
                    <div className='relative -mt-12'>
                        <CheckboxList type='default' date={curDate}/>
                    </div>
                </div>
                {/* 일기영역 */}
                <div>
                    <img className='w-[90px] m-auto' src="./assets/img/character/diego.png" alt="디에고" />
                    <div onClick={handleDiaryContents} className='relative -mt-[40px] bg_contents_con p-[20px] flex flex-wrap items-center justify-center'>
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                initial={{
                                    height: 0,
                                }}
                                animate={{
                                    height: isOpen ? 200 : 50,
                                }}
                                exit={{
                                    height: 0,
                                }}
                                transition={{
                                    height: { duration: 0.3 },
                                }}
                                className='overflow-scroll'
                            >
                                <div className='text-left break-keep leading-relaxed'>
                                    {isOpen ? (todayDiary !== undefined) && (todayDiary.content) : 
                                    (todayDiary !== undefined) ? (
                                        <div className='text-center'>
                                            <div>오늘의 일기</div>
                                            [ {todayDiary.title} ]
                                        </div>) 
                                    : "오늘의 일기가 만들어지고 있어요!"}
                                </div>
                            </motion.div>
                        </AnimatePresence>   
                    </div>
                </div>
                {/* 감정영역 */}
                <div>
                    <Emotion onEmotionClick={handleEmotionClick} />
                    <div className='flex items-center'>
                        <div className='ml-6 -mt-2 mr-4'>
                            <img className='w-[90px]' src="./assets/img/character/cloe_basket.png" alt="" />
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