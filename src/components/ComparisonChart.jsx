// components/ComparisonChart.js
import React from "react";
import { Line } from "react-chartjs-2";
function ComparisonChart({chartData }) {
  return (
    <div className="chart-container">
      <Line
        width={200}
        height={120}
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Comparison"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default ComparisonChart;