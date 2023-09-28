import { EmotionType, EmotionResultType, EmotionPeriodType, EmotionCountType } from '@/type/EmotionType';

type TotalEmotionProps = { emotionResultList: EmotionPeriodType[], emotionList: EmotionType[] };

const TotalEmotion = ({emotionResultList, emotionList} : TotalEmotionProps) => {
    const data = emotionList.map(emotion => ({
        imgsrc: `./assets/img/emotion/${emotion.emotionId}.png`,
        name: emotion.name,
        cnt: 0
    }));

     emotionResultList.forEach(dayData => {
        dayData.emotions.forEach(emotion => {
            const index = data.findIndex(item => item.imgsrc === `./assets/img/emotion/${emotion.emotionId}.png`);
            if (index !== -1) {
                data[index].cnt += emotion.count;
            }
        });
    });
    
    return (
        // <div className="bg_contents_con py-[9px] px-[11px] type_2 overflow-hidden child-[div]:float-left child-[div]:w-[12.5%] child-[div]:mb-[15px] child-[div]:px-[4px] child-[div:nth-child(n+9)]:mb-0  child-[div:nth-child(9)]:clear-left">
        <div className="bg_contents_con flex h-[100px] py-[9px] px-[11px] type_2 overflow-x-scroll">
            {data.map((item, index) => {
                    if(item.cnt > 0){
                        return (
                            <div key={index} className="text-center mx-3">
                                <img className="h-[35px] mb-[5px]" src={item.imgsrc} alt={item.name} />
                                <div className="w-[35px] text-[13px] mb-[3px]">{item.name}</div>
                                <div className="text-[13px]">{item.cnt}번</div>
                            </div>
                        )
                    }
                }
            )}
        </div>
    )
}

export default TotalEmotion;