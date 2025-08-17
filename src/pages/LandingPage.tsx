import { useNavigate } from "react-router-dom";
import { CheckupLayout } from "@/components";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/checkup/start");
  };

  return (
    <CheckupLayout title="건강검진 결과 조회 시스템">
      <div className="text-center space-y-6">
        <p className="text-lg text-gray-600 mb-8">
          건강검진 결과를 조회하시려면 아래 버튼을 클릭하세요.
        </p>

        <button
          onClick={handleStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          시작하기
        </button>
      </div>
    </CheckupLayout>
  );
};

export default LandingPage;
