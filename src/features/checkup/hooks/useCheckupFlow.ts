import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { candiyPost } from "@/lib/api";

import type {
  ApiEnvelope,
  CheckupData,
  CheckupRequest,
} from "@/features/checkup/type";

type CheckupStep = "initial" | "pending_auth" | "completed" | "error";

type MultiFactorInfo = {
  transactionId: string;
  jobIndex: number;
  threadIndex: number;
  multiFactorTimestamp: number;
};

export const useCheckupFlow = () => {
  const [step, setStep] = useState<CheckupStep>("initial");
  const [multiFactorInfo, setMultiFactorInfo] =
    useState<MultiFactorInfo | null>(null);
  const [finalData, setFinalData] = useState<CheckupData | null>(null);

  // 1차 요청 (추가인증 정보 받기)
  const initialRequest = useMutation({
    mutationFn: async (
      payload: Omit<CheckupRequest, "isContinue" | "multiFactorInfo">
    ) => candiyPost<ApiEnvelope<CheckupData>>("/v1/nhis/checkup", payload),
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
        // 바로 최종 데이터가 온 경우 (예외적인 경우)
        setFinalData(response.data || null);
        setStep("completed");
      }
    },
    onError: () => {
      setStep("error");
    },
  });

  // 2차 요청 (추가인증 완료 후 최종 데이터 받기)
  const finalRequest = useMutation({
    mutationFn: async (payload: CheckupRequest) =>
      candiyPost<ApiEnvelope<CheckupData>>("/v1/nhis/checkup", payload),
    onSuccess: (response) => {
      setFinalData(response.data || null);
      setStep("completed");
    },
    onError: (error: any) => {
      // "본인인증 절차가 완료되지 않았습니다" 에러인 경우 pending_auth 유지
      if (error?.message?.includes("본인인증 절차가 완료되지 않았습니다")) {
        // 인증이 아직 완료되지 않은 상태 유지
        return;
      }
      setStep("error");
    },
  });

  // 초기 요청 시작
  const startCheckup = (
    payload: Omit<CheckupRequest, "isContinue" | "multiFactorInfo">
  ) => {
    setStep("initial");
    setMultiFactorInfo(null);
    setFinalData(null);
    initialRequest.mutate(payload);
  };

  // 추가인증 완료 후 최종 데이터 요청
  const completeAuth = (
    basePayload: Omit<CheckupRequest, "isContinue" | "multiFactorInfo">
  ) => {
    if (!multiFactorInfo) {
      throw new Error("추가인증 정보가 없습니다.");
    }

    const finalPayload: CheckupRequest = {
      ...basePayload,
      isContinue: "1",
      multiFactorInfo,
    };

    finalRequest.mutate(finalPayload);
  };

  // 인증 취소
  const cancelAuth = () => {
    setStep("initial");
    setMultiFactorInfo(null);
    setFinalData(null);
  };

  return {
    step,
    multiFactorInfo,
    finalData,
    startCheckup,
    completeAuth,
    cancelAuth,
    isLoading: initialRequest.isPending || finalRequest.isPending,
    error: initialRequest.error || finalRequest.error,
  };
};
