import ReactApexChart from 'react-apexcharts';

const TasteChart = () => {
  const series = [44, 55, 41, 17, 15];
  const options = {
    chart: {
      type: 'donut',
      fontFamily:'pretendard',
      foreColor: '#acacac',
      
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
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
            position: 'top',
        }
      }
    }],
    labels: ['단맛', '쓴맛', '짠맛', '신맛', '매운맛'],
    colors: ['#ff3251e1', '#ffa640', '#ffe70e', '#63c23d', '#2cb0ee'],
    dataLabels: {
        enabled: false // 숫자 표시를 비활성화
    },
  };

  return (
    <div className='flex justify-center items-center'>
      <ReactApexChart options={options} series={series} type="donut" />
    </div>
  );
}

export default TasteChart;
