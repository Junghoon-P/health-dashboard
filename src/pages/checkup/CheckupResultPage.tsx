import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckupResults } from "@/features/checkup/components";
import { useCheckupStore, useCheckupNavigation } from "@/store/useCheckupStore";

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
    <main className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Health Dashboard</h1>
        </div>
      </header>

      <section className="mx-auto min-w-[320px] max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">건강검진 결과</h2>

        <CheckupResults finalData={finalData} onNewQuery={handleNewQuery} />
      </section>
    </main>
  );
};

export default CheckupResultPage;
