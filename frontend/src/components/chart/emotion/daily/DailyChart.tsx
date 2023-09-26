import { useState, useEffect } from 'react';
import { getDailyData } from "@/api/Emotion";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import TotalEmotion from "./TotalEmotion";
import { EmotionType, EmotionResultType } from '@/type/EmotionType';
import { getEmotionList } from '@/api/Emotion';

const DailyChart = ({selectDate} : {selectDate: string}) => {
    const [ emotionResultList, setEmontionResultList] = useState<EmotionResultType[]>([]);
    const [ emotionList, setEmontionList ] = useState<EmotionType[]>([]);

    const getData = async () => {
        await getDailyData({date : selectDate}, ({data}) => {
            setEmontionResultList(() => data.data as EmotionResultType[]);
        }, (error) => {console.log(error)});
    };

    const getEmotionData =async () => {
        await getEmotionList(({data}) => {
          setEmontionList(() => data.data as EmotionType[]);
        }, (error) => {console.log(error)});
      }

    useEffect(() => {
        void getEmotionData();
        void getData();
    }, []);


    return (
        <div>
            {/* <LineChart emotionResultList={emotionResultList} /> */}
            <BarChart emotionResultList={emotionResultList} emotionList={emotionList} />
            <TotalEmotion emotionResultList={emotionResultList} emotionList={emotionList} />
        </div>
    )
}

export default DailyChart;