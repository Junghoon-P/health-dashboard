import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthPendingState } from "@/features/checkup/components";
import { useCheckupApi } from "@/features/checkup/hooks";
import { useCheckupStore, useCheckupNavigation } from "@/store/useCheckupStore";
import { CheckupLayout } from "@/components";

const CheckupVerifyPage = () => {
  const navigate = useNavigate();
  const { shouldRedirectTo } = useCheckupNavigation();

  const { step, multiFactorInfo, isLoading, error, setStep } =
    useCheckupStore();

  const { completeAuth, cancelAuth } = useCheckupApi();

  // 에러 발생 시 에러 페이지로 리다이렉트
  useEffect(() => {
    if (error && step !== "error") {
      setStep("error");
    }
  }, [error, step, setStep]);

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
    <CheckupLayout title="본인인증 진행">
      <AuthPendingState
        multiFactorInfo={multiFactorInfo}
        onCompleteAuth={handleCompleteAuth}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </CheckupLayout>
  );
};

export default CheckupVerifyPage;
