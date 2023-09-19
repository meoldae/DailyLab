import { useEffect, useState } from "react"; // `useState` 추가
import EmotionType from "@/type/EmotionType";
import { getEmotionList } from "@/api/Emotion";

interface EmotionProps {
    onEmotionClick: (emotionId: number) => void;
}

const Emotion: React.FC<EmotionProps> = ({ onEmotionClick }) => {
    const [emotionList, setEmotionList] = useState<EmotionType[]>([]);

    const fetchData = async () => {
        await getEmotionList(
            (Response) => {
                console.log(Response.data);
                setEmotionList(Response.data);
        },
        (error) => {
            console.error('Error fetching emotion list:', error);
        },
        )
    }

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <div className="m-auto p-4 bg-primary rounded-2xl max-w-xl
        child-[button]:w-[30px]
        child-[button]:m-2">
            {emotionList.length > 0 && emotionList.map((emo, index) => (
                <button className="transition-transform duration-300 ease-in-out active:scale-125" key={index} onClick={() => onEmotionClick(emo.emotionId)}>
                    <img src={`src/resources/img/emotion/${emo.emotionId}.png`} alt={emo.name} />
                </button>
            ))}
        </div>
    )
}

export default Emotion;
