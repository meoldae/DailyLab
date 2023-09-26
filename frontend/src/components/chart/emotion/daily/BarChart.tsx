import ApexCharts from "react-apexcharts";
import {EmotionType, EmotionResultType} from '@/type/EmotionType';
import { useState } from "react";

const BarChart = ({emotionResultList, emotionList} : {emotionResultList: EmotionResultType[], emotionList : EmotionType[]}) => {
  const [horizontal, setHorizontal] = useState(false);
    const data = new Array(emotionList.length);
    for(let i=0; i < emotionList.length; i++) data[i] = {name : String(i), data : [0,0,0,0]};

    emotionResultList.map((item) => {
        const hourPeriod = Math.floor(Number(item.timeStamp.substring(0, 2)) / 6);
        data[item.emotionId - 1].data[hourPeriod] = data[item.emotionId - 1].data[hourPeriod] + 1;
    });

    const state = data;
    const options: ApexCharts.ApexOptions = {
        states: {
            active: {
              filter: {
                type: 'none' /* none, lighten, darken */
              }
            },
            hover: {
                filter: {
                    type: 'none' /* none, lighten, darken */
                } 
            }
        },
        colors : emotionList.map((item) => item.color),
        chart: {
            type: 'bar',
            toolbar:{show:false},
            height: '350px',
            stacked: true,
            background: "transparent",
            zoom: {enabled: false},
            selection : {enabled: false},
          },
          plotOptions: {
            bar: {
              horizontal: horizontal,
              columnWidth: '40%',
              borderRadius: 10,
            },
          },
          xaxis: {
            categories: ['00 ~ 06', '06 ~ 12', '12 ~ 18', '18 ~ 24'],
            labels: {
              style: {
                colors: '#acacac'
              }
            },
          },
          yaxis: {show: false,},
          tooltip: {enabled: false},
          dataLabels: {enabled: false},
          fill: {opacity: 1},
          legend: {show: false}
    }

    const toggleHorizontal = () => {
      setHorizontal(prevHorizontal => !prevHorizontal);
  }

    return (
      <div className="text-right">
        <button onClick={toggleHorizontal}>
          <div className="-mb-[50px] mr-8 w-[50px] h-[25px] rounded-xl flex items-center justify-center bg-gray text-primary font-semibold text-xl">
            {horizontal ? "시간" : "개수"}
          </div>
        </button>
        <ApexCharts type="bar" series={state} options={options} />
      </div>
    )
}

export default BarChart;