import ApexCharts from "react-apexcharts";
import { EmotionType } from '@/type/EmotionType';
import { useState } from "react";

type TransformedDataType = { name: string; data: number[] }[];

const BarChart = ({ transformedData, emotionList, period }: { transformedData: TransformedDataType, emotionList: EmotionType[], period: string }) => {
    const [horizontal, setHorizontal] = useState(false);
  
    const toggleHorizontal = () => {
        setHorizontal(prevHorizontal => !prevHorizontal);
    }
  
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
            categories: period === 'week' ? ['월', '화', '수', '목', '금', '토', '일'] : ['1주', '2주', '3주', '4주', '5주'],
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

    return (
      <div className="text-right">
        <button onClick={toggleHorizontal}>
          <div className="-mb-[50px] mr-8 w-[50px] h-[25px] rounded-xl flex items-center justify-center bg-gray text-primary font-semibold text-xl">
            {horizontal ? "시간" : "개수"}
          </div>
        </button>
        <ApexCharts type="bar" series={transformedData} options={options} />
      </div>
    )
}

export default BarChart;