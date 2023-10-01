import Todo from '@/components/todo/Todo';
import { diegoImg, cloe2Img } from '@/components/character/Character';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postTodayDiary } from '@/api/diary';
import Emotion from '@/components/emotion/Emotion';
import CustomModal from '@/utils/CustomModal/customModal';
import ProceedMatter from './ProceedMatter';
import { Player } from '@lottiefiles/react-lottie-player';
import { useProgress } from "@/atom/ProgressAtom";


const MainProceed = ({getDate} : { getDate : string}) => {

    const { resetProgress } = useProgress();
    useEffect(() => {
        resetProgress();
    },[]);

    const navigate = useNavigate();
    const [proceedText, setProceedText] = useState("");
    const [emotionMode, setEmotionMode] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    // const lottieRef = useRef();
    const lottieRef = useRef<Player | null>(null);
    
    // 현재 시간을 구하는 함수
    const getCurrentHour = () => {
        const currentHour = new Date().getHours();
        return currentHour;
    }

    // 시간대에 따른 메시지를 반환하는 함수
    const getTimeBasedGreeting = () => {
        const hour = getCurrentHour();
        if (hour >= 5 && hour < 12) {
            return '아침은 드셨나요?';
        } else if (hour >= 12 && hour < 18) {
            return '점심은 맛있게 드셨나요?';
        } else {
            return '어떤 저녁을 보내고 계신가요?';
        }
    }
    
    const getNewDiary = async () => {
        await postTodayDiary(getDate ,({ data }) => {
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

    useEffect(()=>{
        if (lottieRef.current) {
            lottieRef.current.play();
        }
    },[proceedText])

    if(!emotionMode) {
        return (
            <div className='contents_wrap'>
                <div className='text-center text-2xl font-semibold child-[div:not(:last-child)]:mb-12 child-[div]:m-auto child-[div]:max-w-xl'>
                    {/* 안내멘트 영역 */}
                    <div>
                        <img className='w-[90px] m-auto' src={diegoImg} alt="디에고" />
                        <div className='relative -mt-[40px] bg_contents_con p-[20px] flex flex-wrap items-center justify-center'>
                            {
                                proceedText != "" ? <p>{proceedText}를 해내셨네요!</p>
                                : <p>{`${Number(getDate.split('-')[1])}월 ${Number(getDate.split('-')[2])}일`}의 연구를 진행중이에요</p>
                            }
                            
                        </div>
                    </div>
                    {/* TODO영역 */}
                    <div>
                        <div className='flex items-center justify-end'>
                            <p>오늘은 이런 일 어떨까요?</p>
                            <Player
                            className="rounded-3xl"
                            autoplay={false}
                            loop={false}
                            src="./assets/lottie/ian.json"
                            style={{ width: '90px' }}
                            ref={lottieRef}
                            />
                            {/* <img className='w-[90px]' src={ianImg} alt="이안" /> */}
                        </div>
                        <div className='relative -mt-12'>
                            <Todo mode="current" date={getDate} setText={setProceedText}/>
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
                    <div onClick={() => setModalOpen(true)} className='w-72 h-20 bg-text rounded-2xl flex items-center justify-center'>
                        <p className='text-primary'>하루 마무리</p>
                    </div>
                    {modalOpen && (
                        <CustomModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
                        <div className='p-[10px]'>
                            <div className='flex items-center justify-center'>
                                <img className='w-1/4' src="./assets/img/character/warning.png" alt="" />
                                <span className='w-2/3 text-center text-xl'>
                                    하루 마무리를 누르면<br/>더이상 할일과 감정을 수정할 수 없어요!
                                    <p className='text-2xl font-semibold mt-4'>오늘 하루를 마무리 하시겠어요?</p>
                                </span>
                            </div>
                            <div className='font-bold mt-4 text-center'>
                                <button onClick={() => setModalOpen(false)} className='mx-4 px-[20px] py-[5px] rounded-xl text-2xl bg-gray'>
                                    취소
                                </button>
                                <button onClick={handleFinish} className='mx-4 px-[15px] py-[5px] rounded-xl text-2xl bg-orange'>
                                    마무리
                                </button>
                            </div>
                        </div>
                        </CustomModal>
                    )}
                </div>
                <div id='matterCanvasCon' className="absolute left-0 top-[20px] -z-10">
                    <ProceedMatter date={getDate}/>
                </div>
            </div>
        )
    }
    return (
        <Emotion changeMode={changeEmotionMode} />
    )
}

export default MainProceed;