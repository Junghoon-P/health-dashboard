import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthPendingState } from "@/features/checkup/components";
import { useCheckupApi } from "@/features/checkup/hooks";
import { useCheckupStore, useCheckupNavigation } from "@/store/useCheckupStore";

const CheckupVerifyPage = () => {
  const navigate = useNavigate();
  const { shouldRedirectTo } = useCheckupNavigation();

  const { step, multiFactorInfo, isLoading, error } = useCheckupStore();

  const { completeAuth, cancelAuth } = useCheckupApi();

  // step이나 multiFactorInfo 변화에 따른 자동 네비게이션
  useEffect(() => {
    const redirectPath = shouldRedirectTo();
    if (redirectPath && redirectPath !== "/checkup/verify") {
      navigate(redirectPath);
      return;
    }

    // multiFactorInfo가 없으면 시작 페이지로
    if (!multiFactorInfo) {
      navigate("/checkup/start");
    }
  }, [step, multiFactorInfo, navigate, shouldRedirectTo]);

  const handleCompleteAuth = async () => {
    await completeAuth();
  };

  const handleCancel = () => {
    cancelAuth();
  };

  // 데이터가 없으면 렌더링하지 않음
  if (!multiFactorInfo) {
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
        <h2 className="text-2xl font-bold mb-6">본인인증 진행</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">
              {error.message || "오류가 발생했습니다."}
            </p>
          </div>
        )}

        <AuthPendingState
          multiFactorInfo={multiFactorInfo}
          onCompleteAuth={handleCompleteAuth}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
};

export default CheckupVerifyPage;
