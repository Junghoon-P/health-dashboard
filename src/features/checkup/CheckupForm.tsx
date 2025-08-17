import {
  AuthPendingState,
  CheckupFormFields,
  CheckupResults,
} from "@/features/checkup/components";
import { useCheckupFlow, useCheckupFormData } from "@/features/checkup/hooks";

const CheckupForm = () => {
  const {
    step,
    multiFactorInfo,
    finalData,
    startCheckup,
    completeAuth,
    cancelAuth,
    isLoading,
    error,
  } = useCheckupFlow();

  const { formData, updateFormData, validateForm, generateId } =
    useCheckupFormData();

  const handleSubmit = () => {
    if (validateForm()) {
      startCheckup(formData);
    }
  };

  const handleCompleteAuth = () => {
    completeAuth(formData);
  };

  const handleNewQuery = () => {
    cancelAuth();
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">건강검진 결과 조회</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">
            {error.message || "오류가 발생했습니다."}
          </p>
        </div>
      )}

      {step === "pending_auth" && (
        <AuthPendingState
          multiFactorInfo={multiFactorInfo}
          onCompleteAuth={handleCompleteAuth}
          onCancel={cancelAuth}
          isLoading={isLoading}
        />
      )}

      {step === "completed" && (
        <CheckupResults finalData={finalData} onNewQuery={handleNewQuery} />
      )}

      {(step === "initial" || step === "error") && (
        <CheckupFormFields
          formData={formData}
          updateFormData={updateFormData}
          onGenerateId={generateId}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default CheckupForm;
