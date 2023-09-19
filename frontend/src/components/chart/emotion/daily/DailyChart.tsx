import { useState, useEffect } from 'react';
import { getDailyData } from "@/api/Emotion";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import TotalEmotion from "./TotalEmotion";
import EmotionType from '@/type/EmotionType';
import { getEmotionList } from '@/api/Emotion';

const DailyChart = ({selectDate} : {selectDate: string}) => {
    const [ emotionList, setEmontionList ] = useState<EmotionType[]>([]);

    const getData = async () => {
        await getDailyData({date : selectDate}, ({data}) => {
            console.log(data);
        }, (error) => {console.log(error)});
    };

    const getEmotionData =async () => {
        await getEmotionList(({data}) => {
          setEmontionList(() => data.data as EmotionType[]);
        }, (error) => {console.log(error)});
      }

    useEffect(() => {
        void getData();
        void getEmotionData();
    }, []);


    return (
        <div>
            <LineChart />
            <BarChart emotionList={emotionList} />
            <TotalEmotion />
        </div>
    )
}

export default DailyChart;