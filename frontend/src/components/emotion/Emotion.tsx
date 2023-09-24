import { useEffect, useState } from "react";
import EmotionMatter from "./EmotionMatter";
import { getEmotionList } from "@/api/Emotion";
import { EmotionType } from "@/type/EmotionType";

const Emotion = () => {
    const [circleCount, setCircleCount] = useState(0);
    const [emotionNo, setEmotionNo] = useState(1); // 이 부분에 emotionNo를 추가하고 초기값을 설정합니다.
    const [emotionList, setEmotionList] = useState<EmotionType[]>([]);
    
    const handleButtonClick = () => {
      setCircleCount(prevCount => prevCount + 1);
    };
  
    const onEmotionClick = (emoId: number) => {
      setEmotionNo(emoId); // 버튼 클릭 시 emotionNo를 변경합니다.
      void handleButtonClick();
    };

    const getList = async () => {
        await getEmotionList(({data}) => {
            console.log(data)
            setEmotionList(data.data as EmotionType[])
        }, (error) => {console.log(error)});
    };

    useEffect(() => {
        void getList();
    }, []);
  
    return (
      <div className="">
        <div className="absolute top-[150px] left-[calc(50%-160px)]">
        <div className="text-center font-semibold text-3xl">
            <p className="mb-24">오늘은 어떤 기분이신가요?</p>
            <div className="relative mb-[250px]">
                <img className="absolute left-1/2 mb-24 transform -translate-x-1/2 w-[150px]" src="./assets/img/character/cloe_noface.png" alt="클로에" />
                <img className="absolute left-1/2 transform mt-[20px] -translate-x-1/2 w-[100px]" src={circleCount === 0 ? `./assets/img/emotion/face/100.png` : `./assets/img/emotion/face/${emotionNo}.png`} alt="표정" />
            </div>
        </div>
            <div className="w-[320px] m-auto bg_contents_con p-[20px] child-[button]:w-[40px] child-[button]:m-3">
                {emotionList.length > 0 && emotionList.map((emo, index) => (
                <button className="transition-transform duration-300 ease-in-out active:scale-125" key={index} onClick={() => {onEmotionClick(emo.emotionId)}}>
                    <img src={`./assets/img/emotion/${emo.emotionId}.png`} alt={emo.name} />
                    <p className="font-light text-xl p-2 text-text">{emo.name}</p>
                </button>
                ))}
            </div>
        </div>
        <EmotionMatter circleCount={circleCount} emotionNo={emotionNo} />
      </div>
    );
  };
  
  export default Emotion;
  