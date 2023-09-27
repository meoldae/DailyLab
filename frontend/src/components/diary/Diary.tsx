import { getTodayDiary } from "@/api/diary";
import { useEffect, useState } from "react";
import { diego2Img } from "../character/Character";

interface DiaryProps {
    date : string;
}

  interface DiaryType { 
    title : string,
    content : string,
}

const Diary: React.FC<DiaryProps> = ({ date }) => {
    const [todayDiary, setTodayDiary] = useState<DiaryType>();

    const getDiary = async () =>{
        await getTodayDiary(date, ({data}) => {
            console.log(data.data)
            setTodayDiary(data.data as DiaryType)
        }, (error) => {console.log(error)})
    }

    // 오늘의 일기 받아오기
    useEffect(() => {
        void getDiary();
    }, []);

    return (
        <div>
            {/* 캐릭터 영역*/}
            <div className='flex items-center'>
                <img className='w-[90px] mr-4' src={diego2Img} alt="디에고" />
                <div className="-mt-4 text-2xl font-semibold">오늘의 일기를 써봤어요</div>
            </div>
            {/* 일기 내용 */}
            <div className='relative -mt-[20px] bg_contents_con p-[20px] max-h-[50vh] overflow-scroll font-light text-xl text-left break-keep leading-relaxed'>
                <p className="text-center mb-4 font-semibold text-xl">
                    {todayDiary?.title}
                </p>
                {todayDiary?.content}
            </div>
        </div>
    )
}

export default Diary;