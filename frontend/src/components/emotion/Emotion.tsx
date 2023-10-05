import { useEffect, useRef, useState } from "react";
import EmotionMatter from "./EmotionMatter";
import { getEmotionList, putEmotion } from "@/api/Emotion";
import { EmotionType } from "@/type/EmotionType";
import { Player } from '@lottiefiles/react-lottie-player';
import { addHours } from "date-fns";
import { cloeNoFaceImg } from "@/components/character/Character";
import { motion, useAnimation } from "framer-motion";

interface props {
    changeMode : () => void
}

const Emotion = (props: props) => {
    const [circleCount, setCircleCount] = useState(0);
    const [emotionNo, setEmotionNo] = useState(1); 
    const [emotionName, setEmotionName] = useState(""); 
    const [emotionType, setEmotionType] = useState(""); 
    const [emotionList, setEmotionList] = useState<EmotionType[]>([]);
    const controls = useAnimation();

    useEffect(() => {
        getEmotionList(({data}) => {
            setEmotionList(data.data as EmotionType[]);
        }, (error) => {console.log(error)});
    }, []);
    
    const onEmotionClick = (emoId: number, name: string, type: string) => {
        setEmotionNo(emoId); // 버튼 클릭 시 emotionNo를 변경합니다.
        setEmotionName(name);
        setEmotionType(type);
        updateEmotion(emoId);
        setCircleCount(prevCount => prevCount + 1);
        controls.start({
            // y: [-10, 10, -10, 10, -5, 5, -5, 5, 0],
            y: [-5, 5, -1, 1, 0],
            transition: { duration: 0.5 }
        });
    };

    const updateEmotion = async (emotionId : number) => {
        const now = new Date();
        const newDate = addHours(now, 9);
        const formattedDateTime = newDate.toISOString().slice(0, 16).replace("T", " ");

        const emotionData = {
            emotionId: emotionId,
            timeStamp: formattedDateTime
        };

        await putEmotion(emotionData,({ data }) => {
        }, (error) => {console.log(error)});

    };
  
    return (
      <div className="w-full absolute px-[20px]">
        <div onClick={props.changeMode} className="mb-[30px] inline-flex items-center">
            <img className="w-[30px] transform scale-x-[-1]" src="./assets/img/icon/arrow_right.png" alt="" />
            <p className="text-2xl font-semibold">돌아가기</p>
        </div>
        <div className="mb-[40px] flex justify-center items-center py-[20px] bg-primary rounded-3xl text-2xl font-light text-center min-h-[80px]">
            {circleCount === 0
                ? (<div>오늘은 어떤 기분이신가요?</div>)
                : (<div>이 감정은... <p className="inline font-bold" >{emotionName}!</p><br/> {emotionType === 'n' ? "안좋은 감정은 제가 대신 가져갈게요" : "저까지 기분이 좋아지네요"}</div>)
            }
        </div>
        <motion.div animate={controls} className="relative mb-[30px]">
            <img className="w-[150px] mx-auto" src={cloeNoFaceImg} alt="클로에" />
            <img className="absolute top-[20px] left-[calc(50%-50px)] w-[100px]" src={circleCount === 0 ? `./assets/img/emotion/face/100.png` : `./assets/img/emotion/face/${emotionNo}.png`} alt="표정" />
        </motion.div>
        <div className="overflow-hidden bg_contents_con p-[20px] w-full child-[div:nth-child(5n+1)]:clear-left">
            {emotionList.length > 0 && emotionList.map((emo, index) => (
                <div className="float-left text-center w-[20%]">
                    <button className="p-1 transition-transform duration-300 ease-in-out active:scale-125 webkit-tap-highlight-color" key={index} onClick={() => {onEmotionClick(emo.emotionId, emo.name, emo.type)}}>
                        <img className="w-[40px]" src={`./assets/img/emotion/${emo.emotionId}.png`} alt={emo.name} />
                        <p className="font-light text-xl p-2 text-text">{emo.name}</p>
                    </button>
                </div>
            ))}
        </div>
        <div>
            <EmotionMatter circleCount={circleCount} emotionNo={emotionNo} />
        </div>
      </div>
    );
  };
  
  export default Emotion;
  