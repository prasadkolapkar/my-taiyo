import React from 'react';
import Chart from 'react-apexcharts';
interface LineChartProps {
  data: { x: string[]; y: number[] };
  xAxisTitle: string;
  yAxisTitle: string;
  title: string;
}
const LineChart: React.FC<LineChartProps> = ({
  data,
  xAxisTitle,
  yAxisTitle,
  title
}) => {
  const options = {
    chart: {
      id: 'line-chart',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
    }, grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: data.x,
      title: {
        text: xAxisTitle,
      },
    },
    yaxis: {
      title: {
        text: yAxisTitle,
      },
    },
    legend: {
      show: true
    },
    dataLabels: {
      enabled: true,
    },
    markers: {
      size: 1
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    }
  };

  const series = [
    {
      name: 'Count',
      data: data.y,
    },
  ];

  return (
    <div>
      <div className="text-4xl font-bold text-center">{title}</div>
      <Chart options={options} series={series} type="line" height={400} />
    </div>
  );
};

export default LineChart;
