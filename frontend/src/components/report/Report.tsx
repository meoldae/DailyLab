import { getTodayDiary } from "@/api/diary";
import { useEffect, useState } from "react";

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

    const getDiary = async () =>{
        await getTodayDiary(date, ({data}) => {
            console.log(data.data)
            setTodayDiary(data.data as ReportType)
        }, (error) => {console.log(error)})
    }

    // 오늘의 일지 받아오기
    useEffect(() => {
        void getDiary();
    }, []);

    return (
        <div>
            {/* 일지 내용 */}
            <div className='bg_contents_con p-[20px] max-h-[50vh] overflow-scroll font-light text-xl text-left break-keep leading-relaxed
            child-[div:not(:last-child)]:mb-4 [&>div>p]:text-2xl [&>div>p]:font-semibold'>
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
                <div>
                    <p>점수</p>{todayDiary?.score}
                </div>
            </div>
        </div>
    )
}

export default Report;