import ApexCharts from "react-apexcharts";
import { EmotionResultType } from '@/type/EmotionType';
import emtionCategoryImg000 from "@/resources/img/emotion/emotion_category_img_000.png";
import emtionCategoryImg001 from "@/resources/img/emotion/emotion_category_img_001.png";
import emtionCategoryImg002 from "@/resources/img/emotion/emotion_category_img_002.png";

interface typeResult {
    p : number
    n : number
}

const LineChart = ({emotionResultList} : {emotionResultList: EmotionResultType[]}) => {
    

    const tempData:typeResult[] = [];
    const data = [];
    for(let i=0; i < 24; i++){
        data.push(0);
        tempData.push({"p" : 0, "n" : 0});
    }
    emotionResultList.map((item) => {
        const hour = Number(item.timeStamp.substring(0, 2));
        tempData[hour].get(item.type)++;
    });

    const state = [{
        name: "Daily Emotion",
        data: [0, 0.2, 1, -0.2, 0, 0.4, 0.5, -0.5, 0]
    }];
    const options: ApexCharts.ApexOptions = {
        chart: {
          height: '350px',
          toolbar:{show:false},
          background: "transparent",
          zoom: {enabled: false},
        },
        tooltip: {enabled: false},
        dataLabels: {enabled: false},
        stroke: {curve: 'smooth', colors: ['#12AB47']},
        yaxis: {show: false, min: -1, max: 1, tickAmount: 2},
        xaxis: {categories: ['00', '03', '06', '09', '12', '15', '18', '21', '24'],}
      }

    return (
        <div className="flex items-stretch">
            <div className="flex flex-col justify-between pt-6 pb-[4rem] -mr-[20px] z-[2]">
                <img className="w-[30px]" src={emtionCategoryImg000} alt="좋음" />
                <img className="w-[30px]" src={emtionCategoryImg001} alt="중립" />
                <img className="w-[30px]" src={emtionCategoryImg002} alt="나쁨" />
            </div>
            <div className="flex-1">
                <ApexCharts type="line" series={state} options={options}/>
            </div>
        </div>
    )
}

export default LineChart;