import React from 'react';
import ReactApexChart from 'react-apexcharts';

class CategoryChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        data: [40, 43, 48, 47, 54, 58]
      }],
      options: {
        chart: {
          type: 'bar',
        //   height: 300,
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
            position: 'top' // 범례를 상단에 배치
          },
          toolbar: {
            show:false,
          },
        plotOptions: {
          bar: {
            barHeight: '100%',
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
        // stroke: {
        //   width: 1,
        //   colors: ['#ff00000']
        // },
        xaxis: {
          categories: ['소통', '성장', '일상', '과업', '여가', '기타'],
        },
        yaxis: {
          labels: {
            show: true
          }
        },
      },
    };
  }

  render() {
    return (
      <div className='pr-4' id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={250} />
      </div>
    );
  }
}

export default CategoryChart;
