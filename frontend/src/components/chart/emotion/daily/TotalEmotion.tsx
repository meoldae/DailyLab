import { useEffect } from 'react';
import { getEmotionList } from '@/api/Emotion';
import { GetAccessToken } from '@/atom/UserAtom';

const TotalEmotion = () => {
    const getList = async () => {
        await getEmotionList(({data}) => {
            console.log(data);
        }, (error) => {console.log(error)}) 
    }

    useEffect(() => {
        void getList();
        
    }, []);


    return (
        <div className="bg_contents_con type_2 overflow-hidden child-[div]:float-left child-[div]:w-[12.5%] child-[div]:mb-[15px] child-[div:nth-child(n+9)]:mb-0  child-[div:nth-child(9)]:clear-left">
            {/*emotionList.map((item, index) => (
                <div key={index} className="text-center">
                    <img className="mb-[5px]" src={item.imgsrc} alt={item.name} />
                    <div className="text-[13px] mb-[3px]">{item.name}</div>
                    <div className="text-[13px]">5번</div>
                </div>
            ))*/}
        </div>
    )
}

export default TotalEmotion;