import ApexCharts from "react-apexcharts";
import {EmotionType, EmotionResultType} from '@/type/EmotionType';

const BarChart = ({emotionResultList, emotionList} : {emotionResultList: EmotionResultType[], emotionList : EmotionType[]}) => {
    
    const state = [
        {name: '0', data: [4, 5, 1, 7]},
        {name: '1', data: [3, 2, 5, 2]},
        {name: '2', data: [2, 5, 7, 4]},
        {name: '3', data: [0, 1, 9, 8]},
        {name: '4', data: [3, 2, 5, 2]},
        {name: '5', data: [2, 5, 7, 4]},
        {name: '6', data: [0, 1, 9, 8]},
        {name: '7', data: [3, 2, 5, 2]},
        {name: '8', data: [2, 5, 7, 4]},
        {name: '9', data: [0, 1, 9, 8]},
        {name: '10', data: [3, 2, 5, 2]},
        {name: '11', data: [2, 5, 7, 4]},
        {name: '12', data: [0, 1, 9, 8]},
        {name: '13', data: [3, 2, 5, 2]},
        {name: '14', data: [2, 5, 7, 4]},
    ];
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