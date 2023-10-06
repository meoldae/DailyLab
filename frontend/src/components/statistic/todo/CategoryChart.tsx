import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const CategoryChart = ({chartInfo} : { chartInfo : number[]}) => {
  const [series, setSeries] = useState([{
    data: chartInfo
  }]);

  const [options] = useState({
    chart: {
      type: 'bar',
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
      toolbar:{
        show: false,
      },
    },
    legend: {
      show:false,
      position: 'top'
    },
    toolbar: {
      show:false,
    },
    plotOptions: {
      bar: {
        barHeight: '80%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        },
      }
    },
    colors: ['#ff3251e1', '#ffa640', '#ffe70e', '#63c23d', '#2cb0ee', '#702cee'],
    dataLabels: {
      enabled: false,
      textAnchor: 'start',
      style: {
        colors: ['#ffffff']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex]
      },
      offsetX: 0,
      dropShadow: {
        enabled: false
      }
    },
    xaxis: {
      categories: ['소통', '성장', '일상', '과업', '여가', '기타'],
    },
    yaxis: {
      labels: {
        show: true
      }
    },
  } as ApexOptions);

  useEffect(() => {
    setSeries([{ data: chartInfo }]);
  }, [chartInfo]);

  return (
    <div className='pr-4' id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={250} />
    </div>
  );
}

export default CategoryChart;
