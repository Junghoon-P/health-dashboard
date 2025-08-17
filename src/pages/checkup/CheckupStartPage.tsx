import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckupFormFields } from "@/features/checkup/components";
import { useCheckupFormData, useCheckupApi } from "@/features/checkup/hooks";
import { useCheckupStore, useCheckupNavigation } from "@/store/useCheckupStore";
import { CheckupLayout } from "@/components";

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

  const headerActions = step !== "initial" && (
    <button
      onClick={handleReset}
      className="text-sm text-gray-600 hover:text-gray-800"
    >
      새로 시작
    </button>
  );

  return (
    <CheckupLayout title="건강검진 결과 조회" headerActions={headerActions}>
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
    </CheckupLayout>
  );
};

export default CheckupStartPage;
