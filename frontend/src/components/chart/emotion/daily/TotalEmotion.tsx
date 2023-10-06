import { EmotionType, TransformedDataType } from '@/type/EmotionType';

type TotalEmotionProps = { transformedData: TransformedDataType, emotionList: EmotionType[] };

const TotalEmotion = ({ transformedData, emotionList }: TotalEmotionProps) => {
    const data = emotionList.map(emotion => ({
        imgsrc: `./assets/img/emotion/${emotion.emotionId}.png`,
        name: emotion.name,
        cnt: 0
    }));


    transformedData.forEach(emotionData => {
        const emotionId = parseInt(emotionData.name);
        const total = emotionData.data.reduce((acc, count) => acc + count, 0);
        const index = data.findIndex(item => item.imgsrc === `./assets/img/emotion/${emotionId}.png`);

        if (index !== -1) {
            data[index].cnt += total;
        }
    });
    
    return (
        // <div className="bg_contents_con py-[9px] px-[11px] type_2 overflow-hidden child-[div]:float-left child-[div]:w-[12.5%] child-[div]:mb-[15px] child-[div]:px-[4px] child-[div:nth-child(n+9)]:mb-0  child-[div:nth-child(9)]:clear-left">
        <div className="bg_contents_con flex h-[100px] py-[9px] px-[11px] type_2 overflow-x-scroll">
            {data.map((item, index) => {
                    if(item.cnt > 0){
                        let displayCount = item.cnt < 1000 ? item.cnt : (item.cnt / 1000).toFixed(1) + 'K';
                        return (
                            <div key={index} className="text-center mx-3">
                                <img className="h-[35px] mb-[5px]" src={item.imgsrc} alt={item.name} />
                                <div className="w-[35px] text-[13px] mb-[3px]">{item.name}</div>
                                <div className="text-[13px] break-keep">{`${displayCount}번`}</div>
                            </div>
                        )
                    }
                }
            )}
        </div>
    )
}

export default TotalEmotion;