import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckupFormFields } from "@/features/checkup/components";
import { useCheckupFormData, useCheckupApi } from "@/features/checkup/hooks";
import { useCheckupStore, useCheckupNavigation } from "@/store/useCheckupStore";

const CheckupStartPage = () => {
  const navigate = useNavigate();
  const { shouldRedirectTo } = useCheckupNavigation();

  const { step, isLoading, error, setFormData, resetStore } = useCheckupStore();

  const { formData, updateFormData, validateForm, generateId } =
    useCheckupFormData();

  const { startCheckup } = useCheckupApi();

  // step 변화에 따른 자동 네비게이션
  useEffect(() => {
    const redirectPath = shouldRedirectTo();
    if (redirectPath && redirectPath !== "/checkup/start") {
      navigate(redirectPath);
    }
  }, [step, navigate, shouldRedirectTo]);

  const handleSubmit = async () => {
    if (validateForm()) {
      setFormData(formData);
      await startCheckup();
    }
  };

  const handleReset = () => {
    resetStore();
  };

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Health Dashboard</h1>
          {step !== "initial" && (
            <button
              onClick={handleReset}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              새로 시작
            </button>
          )}
        </div>
      </header>

      <section className="mx-auto min-w-[320px] max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">건강검진 결과 조회</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">
              {error.message || "오류가 발생했습니다."}
            </p>
          </div>
        )}

        <CheckupFormFields
          formData={formData}
          updateFormData={updateFormData}
          onGenerateId={generateId}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
};

export default CheckupStartPage;
