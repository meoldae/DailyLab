import { EmotionType, EmotionResultType } from '@/type/EmotionType';

const TotalEmotion = ({emotionResultList, emotionList} : {emotionResultList: EmotionResultType[], emotionList : EmotionType[]}) => {
    const data = new Array(emotionList.length);
    for(let i=0; i < emotionList.length; i++) data[i] = {imgsrc : `./assets/img/emotion/${emotionList[i].emotionId}.png`, name : emotionList[i].name, cnt : 0};

    emotionResultList.map((item) => data[item.emotionId - 1]["cnt"] = data[item.emotionId - 1]["cnt"] + 1);

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