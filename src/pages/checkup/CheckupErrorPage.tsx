import { useNavigate } from "react-router-dom";
import { useCheckupStore } from "@/store/useCheckupStore";
import { CheckupLayout } from "@/components";

const CheckupErrorPage = () => {
  const navigate = useNavigate();
  const { error, formData, resetStore, clearErrorAndRetry } = useCheckupStore();

  const handleGoHome = () => {
    resetStore();
    navigate("/checkup/start");
  };

  const handleRetryWithData = () => {
    clearErrorAndRetry();
    navigate("/checkup/start");
  };

  return (
    <CheckupLayout title="오류 발생">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            오류가 발생했습니다
          </h3>
          <p className="text-gray-600 mb-6">
            {error?.message || "알 수 없는 오류가 발생했습니다."}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-red-800 mb-2">오류 상세</h4>
          <p className="text-sm text-red-700">
            {error?.message ||
              "시스템에서 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요."}
          </p>
        </div>

        <div className="space-y-3">
          {formData && (
            <button
              onClick={handleRetryWithData}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              입력한 정보 유지하고 다시 시도
            </button>
          )}
          <button
            onClick={handleGoHome}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              formData
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            처음부터 다시 시작
          </button>
        </div>
      </div>
    </CheckupLayout>
  );
};

export default CheckupErrorPage;
