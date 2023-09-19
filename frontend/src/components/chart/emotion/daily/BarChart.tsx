import ApexCharts from "react-apexcharts";
import {EmotionType, EmotionResultType} from '@/type/EmotionType';

const BarChart = ({emotionResultList, emotionList} : {emotionResultList: EmotionResultType[], emotionList : EmotionType[]}) => {
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
              horizontal: false,
              columnWidth: '40%',
              borderRadius: 10,
            },
          },
          xaxis: {categories: ['00 ~ 06', '06 ~ 12', '12 ~ 18', '18 ~ 24']},
          yaxis: {show: false,},
          tooltip: {enabled: false},
          dataLabels: {enabled: false},
          fill: {opacity: 1},
          legend: {show: false}
    }

    return (
        <ApexCharts type="bar" series={state} options={options} />
    )
}

export default BarChart;