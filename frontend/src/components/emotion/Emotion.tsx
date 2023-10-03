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
      <div className="">
        <div className="absolute ml-8">
            <div onClick={props.changeMode} className="flex items-center">
                <img className="w-[30px] transform scale-x-[-1]" src="./assets/img/icon/arrow_right.png" alt="" />
                <p className="text-2xl font-semibold">돌아가기</p>
            </div>
        </div>
        <div className="absolute top-[100px] left-[calc(50%-150px)] h-[230px]">
            <div className="text-center font-light text-2xl">
                <div className="flex w-[300px] h-[80px] justify-center items-center bg-primary rounded-3xl">
                    <div>
                        {circleCount === 0 ? (
                            <div>오늘은 어떤 기분이신가요?</div>
                        ) : (
                            <div>이 감정은... <p className="inline font-bold" >{emotionName}!</p><br/> {emotionType === 'n' ? "안좋은 감정은 제가 대신 가져갈게요" : "저까지 기분이 좋아지네요"}</div>
                        )}
                    </div>
                </div>
                <motion.div animate={controls} className="mt-[50px]">
                    <img className="absolute left-1/2 mb-24 transform -translate-x-1/2 w-[150px]" src={cloeNoFaceImg} alt="클로에" />
                    <img className="absolute left-1/2 transform mt-[20px] -translate-x-1/2 w-[100px]" src={circleCount === 0 ? `./assets/img/emotion/face/100.png` : `./assets/img/emotion/face/${emotionNo}.png`} alt="표정" />
                </motion.div>
            </div>
        </div>
        <div className="absolute top-[400px] left-[calc(50%-160px)] max-h-[300px] h-[calc(100%-500px)] overflow-y-auto w-[320px] bg_contents_con p-[20px] child-[button]:w-[40px] child-[button]:m-3 ">
            {emotionList.length > 0 && emotionList.map((emo, index) => (
            <button className="transition-transform duration-300 ease-in-out active:scale-125 webkit-tap-highlight-color" key={index} onClick={() => {onEmotionClick(emo.emotionId, emo.name, emo.type)}}>
                <img src={`./assets/img/emotion/${emo.emotionId}.png`} alt={emo.name} />
                <p className="font-light text-xl p-2 text-text">{emo.name}</p>
            </button>
            ))}
        </div>
        <div>
            <EmotionMatter circleCount={circleCount} emotionNo={emotionNo} />
        </div>
      </div>
    );
  };
  
  export default Emotion;
  