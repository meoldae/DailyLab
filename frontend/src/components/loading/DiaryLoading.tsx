import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DiaryLoading = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCount => prevCount - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(timer);
            navigate('/'); // 메인 페이지 경로로 수정
        }

        return () => clearInterval(timer);
    }, [countdown, history]);
    
    return (
        <div className="p-[30px] text-center text-3xl font-semibold">
            <div className="mt-[30px] mb-24">
                닫기
            </div>
            <div className="mb-10">
                <p>이안이 오늘 있었던 일을<br />디에고에게 전달하고 있어요</p>
                <img className="w-screen mb-[60px]" src="src/resources/img/character/loading_diary.gif" alt="일기로딩" />
                <p>디에고가 일기를 쓰기까지는<br />30초에서 1분정도 걸려요</p>
            </div>
            <p className="text-3xl font-light">이 페이지는 {countdown}초 후에 자동으로 닫혀요</p>
            <div className="text-right">
                <img className="mr-12 inline w-[150px]" src="src/resources/img/character/loading_emotion.gif" alt="감정로딩" />
            </div>
        </div>
    )
}

export default DiaryLoading;