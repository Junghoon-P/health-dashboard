import React from "react";
import { Bar } from "react-chartjs-2";
import { getLiverStatus } from "../../utils/healthCalculations";

interface LiverFunctionChartProps {
  liver: ReturnType<typeof getLiverStatus>;
}

const LiverFunctionChart = ({ liver }: LiverFunctionChartProps) => {
  if (!liver.ast && !liver.alt && !liver.gpt) return null;

  const data = {
    labels: ["AST", "ALT", "γ-GTP"],
    datasets: [
      {
        data: [
          liver.ast?.value || 0,
          liver.alt?.value || 0,
          liver.gpt?.value || 0,
        ],
        backgroundColor: [
          liver.ast?.status === "정상"
            ? "#10B981"
            : liver.ast?.status === "주의"
            ? "#F59E0B"
            : "#EF4444",
          liver.alt?.status === "정상"
            ? "#10B981"
            : liver.alt?.status === "주의"
            ? "#F59E0B"
            : "#EF4444",
          liver.gpt?.status === "정상"
            ? "#10B981"
            : liver.gpt?.status === "주의"
            ? "#F59E0B"
            : "#EF4444",
        ],
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { font: { size: 10 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } },
      },
    },
  };

  return (
    <div className="h-24 sm:h-32">
      <Bar data={data} options={options} />
    </div>
  );
};

export default LiverFunctionChart;
