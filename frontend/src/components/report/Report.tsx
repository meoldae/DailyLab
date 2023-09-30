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
    const [isBottom, setIsBottom] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const lottieRef = useRef();
    
    const getDiary = async () =>{
        await getTodayDiary(date, ({data}) => {
            console.log(data.data)
            setTodayDiary(data.data as ReportType)
        }, (error) => {console.log(error)})
    }

    const getScoreGretting = () => {
        const score = todayDiary?.score;
        if (score === 'A+') {
            return '정말 완벽한 하루!';
        } else if (score === 'A') {
            return '정말 멋진 하루!';
        } else if (score === 'B') {
            return '보람찬 하루!';
        } else if (score === 'C') {
            return '노력한 하루!';
        } else {
            return '쉬어가는 하루!';
        }
    }

    useEffect(() => {
            if (lottieRef.current) {
                lottieRef.current.play();
                
                setTimeout(() => {
                if (lottieRef.current) {
                    lottieRef.current.pause();
                }
                }, 18000); 
            }
    },[isBottom])
    
    // 오늘의 일지 받아오기
    useEffect(() => {
        void getDiary();
        const handleScroll = () => {
            if (!containerRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

            if (scrollTop + clientHeight >= scrollHeight-100) {
                setIsBottom(true);
              }
          };

          if(containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
            return () => {
              if(containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
              }
            };
          }
    }, []);

    return (
        <div>
            {/* 일지 내용 */}
            <div ref={containerRef} 
            className='bg_contents_con p-[20px] max-h-[50vh] overflow-scroll font-light text-xl text-left break-keep leading-relaxed
            child-[div]:mb-8 [&>div>p]:text-2xl [&>div>p]:font-semibold'>
                <div>
                    <p>보고서 제목</p>{todayDiary?.title}
                </div>
                <div>
                    <p>데이터 및 관찰</p>{todayDiary?.content}
                </div>
                <div>
                    <p>연구 결과</p>{todayDiary?.conclusion}
                </div>
                <div>
                    <p>결론</p>{todayDiary?.advice}
                </div>
                <div className="pb-4 m-auto w-fit rounded-3xl">
                        <Player
                        className="rounded-3xl"
                        autoplay={false}
                        loop={true}
                        src="./assets/lottie/stamp.json"
                        style={{ width: '150px' }}
                        controls={true}
                        ref={lottieRef}
                        />
                        <p className="text-center font-semibold">{getScoreGretting()}</p>
                </div>
            </div>
        </div>
    )
}

export default Report;