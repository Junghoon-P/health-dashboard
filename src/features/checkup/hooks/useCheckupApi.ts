import { useMutation } from "@tanstack/react-query";
import { candiyPost } from "@/lib/api";
import { useCheckupStore } from "@/store/useCheckupStore";
import type {
  ApiEnvelope,
  CheckupData,
  CheckupRequest,
} from "@/features/checkup/type";

export const useCheckupApi = () => {
  const {
    formData,
    multiFactorInfo,
    setStep,
    setMultiFactorInfo,
    setFinalData,
    setLoading,
    setError,
  } = useCheckupStore();

  // 1차 요청 (추가인증 정보 받기)
  const initialRequest = useMutation({
    mutationFn: async (
      payload: Omit<CheckupRequest, "isContinue" | "multiFactorInfo">
    ) => candiyPost<ApiEnvelope<CheckupData>>("/v1/nhis/checkup", payload),
    onMutate: () => {
      setLoading(true);
      setError(null);
      setStep("initial");
    },
    onSuccess: (response) => {
      if (response.data?.transactionId) {
        // 추가인증이 필요한 경우
        setMultiFactorInfo({
          transactionId: response.data.transactionId,
          jobIndex: response.data.jobIndex!,
          threadIndex: response.data.threadIndex!,
          multiFactorTimestamp: response.data.multiFactorTimestamp!,
        });
        setStep("pending_auth");
      } else {
        // 바로 최종 데이터가 온 경우
        setFinalData(response.data || null);
        setStep("completed");
      }
      setLoading(false);
    },
    onError: (error) => {
      setError(error as Error);
      setStep("error");
      setLoading(false);
    },
  });

  // 2차 요청 (추가인증 완료 후 최종 데이터 받기)
  const finalRequest = useMutation({
    mutationFn: async (payload: CheckupRequest) =>
      candiyPost<ApiEnvelope<CheckupData>>("/v1/nhis/checkup", payload),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (response) => {
      setFinalData(response.data || null);
      setStep("completed");
      setLoading(false);
    },
    onError: (error: any) => {
      // "본인인증 절차가 완료되지 않았습니다" 에러인 경우 pending_auth 유지
      if (error?.message?.includes("본인인증 절차가 완료되지 않았습니다")) {
        setLoading(false);
        return;
      }
      setError(error as Error);
      setStep("error");
      setLoading(false);
    },
  });

  // 초기 요청 시작
  const startCheckup = async () => {
    if (!formData) {
      setError(new Error("폼 데이터가 없습니다."));
      return;
    }
    return await initialRequest.mutateAsync(formData);
  };

  // 추가인증 완료 후 최종 데이터 요청
  const completeAuth = async () => {
    if (!formData || !multiFactorInfo) {
      setError(new Error("필요한 정보가 없습니다."));
      return;
    }

    const payload: CheckupRequest = {
      ...formData,
      isContinue: "1",
      multiFactorInfo,
    };

    return await finalRequest.mutateAsync(payload);
  };

  // 인증 취소
  const cancelAuth = () => {
    setStep("initial");
    setMultiFactorInfo(null);
    setFinalData(null);
    setError(null);
  };

  return {
    startCheckup,
    completeAuth,
    cancelAuth,
    isLoading: initialRequest.isPending || finalRequest.isPending,
    error: initialRequest.error || finalRequest.error,
  };
};
