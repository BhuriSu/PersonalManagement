import React from 'react';
import ApexCharts from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface ChartProps {
  height: number;
  options: ApexOptions;
  series: { name: string; data: number[] }[];
  type: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'scatter';
  width: string;
}

export function Chart({ height, options, series, type, width }: ChartProps): React.JSX.Element {
  return (
    <ApexCharts
      type={type}
      options={options}
      series={series}
      height={height}
      width={width}
    />
  );
}