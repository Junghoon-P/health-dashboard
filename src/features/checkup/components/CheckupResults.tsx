import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import type { CheckupData } from "@/features/checkup/type";
import {
  calculateBMI,
  getBloodPressureStatus,
  getBloodSugarStatus,
  getCholesterolStatus,
  getLiverStatus,
  calculateHealthScore,
} from "../utils/healthCalculations";
import BMIChart from "./charts/BMIChart";
import HealthScoreChart from "./charts/HealthScoreChart";
import CholesterolRadarChart from "./charts/CholesterolRadarChart";
import LiverFunctionChart from "./charts/LiverFunctionChart";
import BloodPressureChart from "./charts/BloodPressureChart";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface CheckupResultsProps {
  finalData?: CheckupData | null;
  onNewQuery: () => void;
}

// 건강 지표 카드 컴포넌트
const HealthCard = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 ${className}`}
  >
    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const CheckupResults = ({ finalData, onNewQuery }: CheckupResultsProps) => {
  console.log("finalData", finalData);
  if (!finalData?.overviewList?.[0]) {
    return (
      <div className="rounded-2xl border bg-white shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          건강검진 결과
        </h2>
        <p className="text-gray-500">검진 결과가 없습니다.</p>
        <button
          onClick={onNewQuery}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
        >
          새로 조회하기
        </button>
      </div>
    );
  }

  const overview = finalData.overviewList[0]; // 최신 검진 결과
  const bmi = calculateBMI(overview.height, overview.weight);
  const bloodPressure = getBloodPressureStatus(overview.bloodPressure);
  const bloodSugar = getBloodSugarStatus(overview.fastingBloodGlucose);
  const cholesterol = getCholesterolStatus(overview);
  const liver = getLiverStatus(overview);
  const healthScore = calculateHealthScore(overview);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              건강검진 결과
            </h2>
            {finalData.patientName && (
              <p className="text-gray-600">검진대상: {finalData.patientName}</p>
            )}
            {overview.checkupDate && (
              <p className="text-sm text-gray-500">
                검진일: {overview.checkupDate}
              </p>
            )}
          </div>
          <div
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              overview.evaluation === "정A" || overview.evaluation === "정B"
                ? "bg-green-100 text-green-800"
                : overview.evaluation === "주의"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            판정: {overview.evaluation || "미정"}
          </div>
        </div>
      </div>

      {/* 건강 점수 및 종합 정보 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthCard title="종합 건강점수">
          <div className="text-center">
            <HealthScoreChart score={healthScore} />
            <div
              className={`text-sm font-medium mt-2 ${
                healthScore >= 80
                  ? "text-green-600"
                  : healthScore >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {healthScore >= 80 ? "우수" : healthScore >= 60 ? "양호" : "주의"}
            </div>
          </div>
        </HealthCard>

        <HealthCard title="체형 정보">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">키</span>
              <span className="font-semibold">
                {overview.height || "정보없음"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">체중</span>
              <span className="font-semibold">
                {overview.weight || "정보없음"}
              </span>
            </div>
            {overview.waists && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">허리둘레</span>
                <span className="font-semibold">{overview.waists}</span>
              </div>
            )}
            {bmi && <BMIChart bmi={bmi} />}
          </div>
        </HealthCard>

        <HealthCard title="혈압">
          <div className="space-y-2">
            {bloodPressure ? (
              <>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800">
                    {bloodPressure.systolic}/{bloodPressure.diastolic}
                  </div>
                  <div className={`text-xs font-medium ${bloodPressure.color}`}>
                    {bloodPressure.status}
                  </div>
                </div>
                <BloodPressureChart bp={bloodPressure} />
              </>
            ) : (
              <div className="text-center text-gray-500 text-sm">
                혈압 정보 없음
              </div>
            )}
          </div>
        </HealthCard>

        <HealthCard title="혈당">
          <div className="space-y-2">
            {bloodSugar ? (
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">
                  {bloodSugar.value}{" "}
                  <span className="text-xs text-gray-500">mg/dL</span>
                </div>
                <div className={`text-xs font-medium ${bloodSugar.color}`}>
                  {bloodSugar.status}
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      bloodSugar.status === "정상"
                        ? "bg-green-500"
                        : bloodSugar.status === "전당뇨"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        (bloodSugar.value / 200) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm">
                혈당 정보 없음
              </div>
            )}
          </div>
        </HealthCard>
      </div>

      {/* 상세 검사 결과 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* 콜레스테롤 카드 */}
        <HealthCard title="콜레스테롤" className="lg:col-span-2 xl:col-span-1">
          <div className="space-y-3">
            {cholesterol.total ||
            cholesterol.hdl ||
            cholesterol.ldl ||
            cholesterol.triglyceride ? (
              <>
                <CholesterolRadarChart cholesterol={cholesterol} />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {cholesterol.total && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">총콜레스테롤</span>
                      <span
                        className={`font-semibold ${
                          cholesterol.total.status === "정상"
                            ? "text-green-600"
                            : cholesterol.total.status === "주의"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {cholesterol.total.value}
                      </span>
                    </div>
                  )}
                  {cholesterol.hdl && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">HDL</span>
                      <span
                        className={`font-semibold ${
                          cholesterol.hdl.status === "정상"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {cholesterol.hdl.value}
                      </span>
                    </div>
                  )}
                  {cholesterol.ldl && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">LDL</span>
                      <span
                        className={`font-semibold ${
                          cholesterol.ldl.status === "정상"
                            ? "text-green-600"
                            : cholesterol.ldl.status === "주의"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {cholesterol.ldl.value}
                      </span>
                    </div>
                  )}
                  {cholesterol.triglyceride && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">중성지방</span>
                      <span
                        className={`font-semibold ${
                          cholesterol.triglyceride.status === "정상"
                            ? "text-green-600"
                            : cholesterol.triglyceride.status === "주의"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {cholesterol.triglyceride.value}
                      </span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-sm">콜레스테롤 검사내역이 없습니다</div>
              </div>
            )}
          </div>
        </HealthCard>

        {/* 간기능 카드 */}
        <HealthCard title="간기능">
          <div className="space-y-3">
            {liver.ast || liver.alt || liver.gpt ? (
              <>
                <LiverFunctionChart liver={liver} />
                <div className="space-y-2 text-xs">
                  {liver.ast && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">AST</span>
                      <span
                        className={`font-semibold ${
                          liver.ast.status === "정상"
                            ? "text-green-600"
                            : liver.ast.status === "주의"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {liver.ast.value} ({liver.ast.status})
                      </span>
                    </div>
                  )}
                  {liver.alt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">ALT</span>
                      <span
                        className={`font-semibold ${
                          liver.alt.status === "정상"
                            ? "text-green-600"
                            : liver.alt.status === "주의"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {liver.alt.value} ({liver.alt.status})
                      </span>
                    </div>
                  )}
                  {liver.gpt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">γ-GTP</span>
                      <span
                        className={`font-semibold ${
                          liver.gpt.status === "정상"
                            ? "text-green-600"
                            : liver.gpt.status === "주의"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {liver.gpt.value} ({liver.gpt.status})
                      </span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-sm">간기능 검사내역이 없습니다</div>
              </div>
            )}
          </div>
        </HealthCard>

        {/* 신장기능 카드 */}
        <HealthCard title="신장기능">
          <div className="space-y-3">
            {overview.serumCreatinine ||
            overview.GFR ||
            overview.proteinuria ? (
              <>
                {overview.serumCreatinine && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">혈청크레아티닌</div>
                    <div className="font-semibold">
                      {overview.serumCreatinine}
                    </div>
                  </div>
                )}
                {overview.GFR && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">GFR</div>
                    <div className="font-semibold">{overview.GFR}</div>
                  </div>
                )}
                {overview.proteinuria && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">요단백</div>
                    <div className="font-semibold">{overview.proteinuria}</div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-sm">신장기능 검사내역이 없습니다</div>
              </div>
            )}
          </div>
        </HealthCard>
      </div>

      {/* 기타 검사 결과 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* 시력 카드 - 항상 표시 */}
        <HealthCard title="시력">
          <div className="text-center">
            {overview.vision ? (
              <div className="text-2xl font-bold text-gray-800">
                {overview.vision}
              </div>
            ) : (
              <div className="py-4 text-gray-500">
                <div className="text-sm">검사내역 없음</div>
              </div>
            )}
          </div>
        </HealthCard>

        {/* 청력 카드 - 항상 표시 */}
        <HealthCard title="청력">
          <div className="text-center">
            {overview.hearing ? (
              <div className="text-2xl font-bold text-gray-800">
                {overview.hearing}
              </div>
            ) : (
              <div className="py-4 text-gray-500">
                <div className="text-sm">검사내역 없음</div>
              </div>
            )}
          </div>
        </HealthCard>

        {/* 혈색소 카드 - 항상 표시 */}
        <HealthCard title="혈색소">
          <div className="text-center">
            {overview.hemoglobin ? (
              <>
                <div className="text-2xl font-bold text-gray-800">
                  {overview.hemoglobin}
                </div>
                <div className="text-sm text-gray-500">g/dL</div>
              </>
            ) : (
              <div className="py-4 text-gray-500">
                <div className="text-sm">검사내역 없음</div>
              </div>
            )}
          </div>
        </HealthCard>

        {/* 흉부검사 카드 - 항상 표시 */}
        <HealthCard title="흉부검사">
          <div className="text-center">
            {overview.chestXrayResult ? (
              <div className="text-sm font-medium text-gray-800">
                {overview.chestXrayResult}
              </div>
            ) : (
              <div className="py-4 text-gray-500">
                <div className="text-sm">검사내역 없음</div>
              </div>
            )}
          </div>
        </HealthCard>

        {/* 골다공증 카드 - 항상 표시 */}
        <HealthCard title="골다공증">
          <div className="text-center">
            {overview.osteoporosis ? (
              <div className="text-sm font-medium text-gray-800">
                {overview.osteoporosis}
              </div>
            ) : (
              <div className="py-4 text-gray-500">
                <div className="text-sm">검사내역 없음</div>
              </div>
            )}
          </div>
        </HealthCard>
      </div>

      {/* 새로 조회하기 버튼 */}
      <div className="text-center">
        <button
          onClick={onNewQuery}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors"
        >
          새로 조회하기
        </button>
      </div>
    </div>
  );
};

export default CheckupResults;
