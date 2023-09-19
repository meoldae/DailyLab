import { useEffect } from 'react';
import { getDailyData } from "@/api/Emotion";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import TotalEmotion from "./TotalEmotion";

const DailyChart = ({selectDate} : {selectDate: string}) => {


    const getData = async () => {
        await getDailyData({date : selectDate}, ({data}) => {
            console.log(data);
        }, (error) => {console.log(error)});
    }

    useEffect(() => {
        //void getData();
    }, []);


    return (
        <div>
            <LineChart />
            <BarChart />
            <TotalEmotion />
        </div>
    )
}

export default DailyChart;