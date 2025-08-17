import { Bar } from "react-chartjs-2";
import { getBloodPressureStatus } from "../../utils/healthCalculations";

interface BloodPressureChartProps {
  bp: ReturnType<typeof getBloodPressureStatus>;
}

const BloodPressureChart = ({ bp }: BloodPressureChartProps) => {
  if (!bp) return null;

  const data = {
    labels: ["수축기", "이완기"],
    datasets: [
      {
        data: [bp.systolic, bp.diastolic],
        backgroundColor: [
          bp.status === "정상"
            ? "#10B981"
            : bp.status === "주의"
            ? "#F59E0B"
            : "#EF4444",
          bp.status === "정상"
            ? "#059669"
            : bp.status === "주의"
            ? "#D97706"
            : "#DC2626",
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
        max: 200,
        grid: { display: false },
        ticks: { display: false },
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

export default BloodPressureChart;
