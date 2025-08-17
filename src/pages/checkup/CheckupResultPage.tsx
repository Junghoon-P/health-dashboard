import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckupResults } from "@/features/checkup/components";
import { useCheckupStore, useCheckupNavigation } from "@/store/useCheckupStore";
import { CheckupLayout } from "@/components";

const CheckupResultPage = () => {
  const navigate = useNavigate();
  const { shouldRedirectTo } = useCheckupNavigation();

  const { finalData, resetStore } = useCheckupStore();

  // finalData가 없거나 step이 변하면 자동 네비게이션
  useEffect(() => {
    const redirectPath = shouldRedirectTo();
    if (redirectPath && redirectPath !== "/checkup/result") {
      navigate(redirectPath);
      return;
    }

    // finalData가 없으면 시작 페이지로
    if (!finalData) {
      navigate("/checkup/start");
    }
  }, [finalData, navigate, shouldRedirectTo]);

  const handleNewQuery = () => {
    resetStore();
  };

  // 데이터가 없으면 렌더링하지 않음
  if (!finalData) {
    return null;
  }

  return (
    <CheckupLayout title="건강검진 결과">
      <CheckupResults finalData={finalData} onNewQuery={handleNewQuery} />
    </CheckupLayout>
  );
};

export default CheckupResultPage;
