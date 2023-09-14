import emotionList from "@/type/EmotionType";

const Emotion = ({ onEmotionClick } : {onEmotionClick : () => void}) => {
    return (
        <div className="m-auto p-4 bg-primary rounded-2xl max-w-xl
        child-[button]:w-[30px]
        child-[button]:m-2">
            {emotionList.length>0 && emotionList.map((emo, index)=>(
            <button className="transition-transform duration-300 ease-in-out active:scale-125" key={index} onClick={() => onEmotionClick()}>
                <img src={emo.imgsrc} alt={emo.name} />
            </button>
            ))}
        </div>
    )
}

export default Emotion;
