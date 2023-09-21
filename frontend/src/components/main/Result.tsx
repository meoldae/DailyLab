import Diary from "@/components/diary/Diary";

const MainResult = ({curDate} : {curDate : string}) => {
    return (
        <div className="text-center
        child-[div:not(:last-child)]:mb-12">
            {/* 일기 부분 */}
            <div>
                <Diary date={curDate}/>
            </div>
            {/* 차트 부분 */}
            <div className="bg_contents_con p-[20px]">
                {/* <DailyChart selectDate={curDate} /> */}
            </div>
            {/* 버튼 */}
            <div className='m-auto w-72 h-20 bg-text rounded-2xl flex items-center justify-center'>
                <p className='text-primary text-2xl'>돌아가기</p>
            </div>
        </div>
    )
}

export default MainResult;