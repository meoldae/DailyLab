import { useEffect, useState } from "react";
import { diego2Img, cloeImg } from "@/components/character/Character";
import TasteMatter from "./TasteMatter";
import { getDailyTaste } from "@/api/Taste";

interface TasteProps {
    date : string;
}

  interface TasteType { 
    tasteName : string,
    imgSrc : string,
    description : string,
}

// const tempTaste = {
//     title : "딸기 프라페 맛",
//     imgSrc : "./assets/img/taste/sweet_01.png",
//     content : "딸기 프라페는 영국에서 왔으며 이 음료를 주위 7명에게 넘기지 않으면,딸기 프라페는 영국에서 왔으며 이 음료를 주위 7명에게 넘기지 않으면,"
// }

const Taste: React.FC<TasteProps> = ({ date }) => {
    const [todayTaste, setTodayTaste] = useState<TasteType>();

    const getTodayTaste = async() => {
        await getDailyTaste(date, ({data}) => {
            console.log(data)
            setTodayTaste(data.data as TasteType)
        }, (error) => {console.log(error)})
    }
    // 오늘의 맛 받아오기
    useEffect(() => {
        getTodayTaste();
    }, []);

    return (
        <div>
            {/* 맛 카드 */}
            <div className='relative bg_contents_con py-[20px] px-[10px] max-h-[50vh] overflow-scroll font-light text-xl text-left break-keep leading-relaxed'>
                {/* 어떤 맛인지 보여주는 곳 */}
                <div className="w-[300px] m-auto bg-secondary rounded-2xl" >
                    <div className="flex p-[20px] items-center justify-around">
                        <div className="">
                            <p className="text-center text-xl mb-4">오늘의 기분은...</p>
                            <p className="text-center text-2xl font-semibold">{todayTaste?.tasteName} 이에요!</p>
                        </div>
                        <img className="w-[80px] h-[80px]" src={`./assets/img/taste/${todayTaste?.imgSrc}.png`} alt="맛" />
                    </div>
                </div>
                {/* 맛 내용 */}
                <div className="w-[300px] p-4 ">
                    {todayTaste?.description}
                </div>
                {/* 느낀 감정 보여주는 곳 */}
                <div className="w-[300px] m-auto bg-secondary rounded-2xl">
                    <div id="matterCanvasCon" className="">
                        <TasteMatter/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Taste;