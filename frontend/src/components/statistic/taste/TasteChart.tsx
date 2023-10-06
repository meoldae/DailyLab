import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const TasteChart = (chartInfo : { chartInfo : number[]}) => {
  const options = {
    chart: {
      type: 'donut',
      fontFamily:'pretendard',
      foreColor: '#acacac',
      width: 100,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
        },
    },
    legend: {
      position: 'top', // 이 부분을 추가하여 legend의 위치를 설정합니다.
    },
    stroke: {
        colors: ['#6666660']
      },
    grid: {
        padding: {
          bottom: -80
        }
      },
    plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
    },
    labels: ['매운맛', '단맛', '신맛', '쓴맛', '짠맛'],
    colors: ['#ff3251e1', '#ffa640', '#ffe70e', '#63c23d', '#2cb0ee'],
    dataLabels: {
        enabled: false // 숫자 표시를 비활성화
    },
  } as ApexOptions;



  return (
    <div className='flex h-[300px] justify-center items-center'>
      <ReactApexChart options={options} series={chartInfo.chartInfo} type="donut" />
    </div>
  );
}

export default TasteChart;
