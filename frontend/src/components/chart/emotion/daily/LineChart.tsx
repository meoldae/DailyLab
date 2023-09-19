import ApexCharts from "react-apexcharts";
import { EmotionResultType } from '@/type/EmotionType';
import emtionCategoryImg000 from "@/resources/img/emotion/emotion_category_img_000.png";
import emtionCategoryImg001 from "@/resources/img/emotion/emotion_category_img_001.png";
import emtionCategoryImg002 from "@/resources/img/emotion/emotion_category_img_002.png";

type LineResult = {
    [key: string]: number
    p : number
    n : number
}

const LineChart = ({emotionResultList} : {emotionResultList: EmotionResultType[]}) => {
    

    const tempData:LineResult[] = [];
    const data = [];
    for(let i=0; i < 24; i++){
        data.push(0);
        tempData.push({p : 0, n : 0});
    }
    emotionResultList.map((item) => {
        const hour = Number(item.timeStamp.substring(0, 2));
        tempData[hour][item.type] = tempData[hour][item.type] + 1;
    });

    tempData.map((item, index) => {if(item.p + item.n > 0) data[index] = (item.p - item.n) / (item.p + item.n);});

    const state = [{
        name: "Daily Emotion",
        data: data
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
        xaxis: {
            categories: ['00','01','02','03', '04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            tickAmount: 6,
        }
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