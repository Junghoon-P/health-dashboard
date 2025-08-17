import React from "react";
import { Doughnut } from "react-chartjs-2";
import { calculateBMI } from "../../utils/healthCalculations";

interface BMIChartProps {
  bmi: ReturnType<typeof calculateBMI>;
}

const BMIChart = ({ bmi }: BMIChartProps) => {
  if (!bmi) return null;

  const data = {
    datasets: [
      {
        data: [bmi.value, 40 - bmi.value],
        backgroundColor: [
          bmi.value < 18.5
            ? "#3B82F6"
            : bmi.value < 25
            ? "#10B981"
            : bmi.value < 30
            ? "#F59E0B"
            : "#EF4444",
          "#F3F4F6",
        ],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="relative h-24 sm:h-32 w-24 sm:w-32 mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg sm:text-xl font-bold text-gray-800">
          {bmi.value.toFixed(1)}
        </span>
        <span className={`text-xs sm:text-sm font-medium ${bmi.color}`}>
          {bmi.status}
        </span>
      </div>
    </div>
  );
};

export default BMIChart;
