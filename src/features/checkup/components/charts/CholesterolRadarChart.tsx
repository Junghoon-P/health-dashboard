import React from "react";
import { Radar } from "react-chartjs-2";
import { getCholesterolStatus } from "../../utils/healthCalculations";

interface CholesterolRadarChartProps {
  cholesterol: ReturnType<typeof getCholesterolStatus>;
}

const CholesterolRadarChart = ({ cholesterol }: CholesterolRadarChartProps) => {
  if (
    !cholesterol.total &&
    !cholesterol.hdl &&
    !cholesterol.ldl &&
    !cholesterol.triglyceride
  )
    return null;

  const data = {
    labels: ["총콜레스테롤", "HDL", "LDL", "중성지방"],
    datasets: [
      {
        label: "수치",
        data: [
          cholesterol.total?.value || 0,
          cholesterol.hdl?.value || 0,
          cholesterol.ldl?.value || 0,
          cholesterol.triglyceride?.value || 0,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgb(59, 130, 246)",
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(59, 130, 246)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 300,
        ticks: { display: false },
        pointLabels: {
          font: { size: 10 },
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="h-32 sm:h-40">
      <Radar data={data} options={options} />
    </div>
  );
};

export default CholesterolRadarChart;
