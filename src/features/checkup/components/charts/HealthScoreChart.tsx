import { Doughnut } from "react-chartjs-2";

interface HealthScoreChartProps {
  score: number;
}

const HealthScoreChart = ({ score }: HealthScoreChartProps) => {
  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [
          score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444",
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
          {score}
        </span>
        <span className="text-xs sm:text-sm text-gray-600">점</span>
      </div>
    </div>
  );
};

export default HealthScoreChart;
