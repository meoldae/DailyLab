import { getTodayDiary } from "@/api/diary";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef, useState } from "react";

interface ReportProps {
    date : string;
}

  interface ReportType { 
    title : string,
    content : string,
    conclusion : string,
    advice : string,
    score : string,     // A+, A, B, C, D
}

const Report: React.FC<ReportProps> = ({ date }) => {
    const [todayDiary, setTodayDiary] = useState<ReportType>();
    const containerRef = useRef<HTMLDivElement>(null);
    const lottieRef = useRef<Player | null>(null);
    const [filePath, setFilePath] = useState('');
    
    const getDiary = async () =>{
        await getTodayDiary(date, ({data}) => {
            console.log(data.data)
            setTodayDiary(data.data as ReportType)
        }, (error) => {console.log(error)})
    }

    useEffect(() => {
         if (todayDiary?.score === 'A+') {
            setFilePath('./assets/lottie/cocoStamp.json');
        } else if (todayDiary?.score === 'A') {
            setFilePath('./assets/lottie/diegoStamp.json');
        } else if (todayDiary?.score === 'B') {
            setFilePath('./assets/lottie/ianStamp.json');
        } else if (todayDiary?.score === 'C') {
            setFilePath('./assets/lottie/marcoStamp.json');
        } else {
            setFilePath('./assets/lottie/cloeStamp.json');
        }
    },[todayDiary?.score])
    
    
    // 오늘의 일지 받아오기
    useEffect(() => {
        void getDiary();
    }, [date]);

    return (
        <div>
            {/* 일지 내용 */}
            <div ref={containerRef}
            className='bg_contents_con p-[20px] max-h-[50vh] overflow-scroll font-light text-[15px] text-left break-keep leading-relaxed
            child-[div]:mb-8 [&>div>p]:text-3xl [&>div>p]:font-semibold'>
                <div className="text-center font-semibold text-3xl">
                    <p className="">{todayDiary?.title}</p>
                </div>
                <div className="pb-4 m-auto w-fit rounded-3xl">
                        <Player
                        className="rounded-3xl"
                        autoplay={true}
                        loop={true}
                        src={filePath}
                        speed={0.7}
                        style={{ width: '150px' }}
                        ref={lottieRef}
                        />
                </div>
                <div className="">
                    <p className="mb-4">연구 내용</p>{todayDiary?.content}
                </div>
                <div>
                    <p className="mb-4">연구 결과</p>{todayDiary?.conclusion}
                </div>
                <div>
                    <p className="mb-4">조언 & 추천</p>{todayDiary?.advice}
                </div>
                
            </div>
        </div>
    )
}

export default Report;