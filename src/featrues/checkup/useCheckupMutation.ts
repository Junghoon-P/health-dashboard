import { useMutation } from "@tanstack/react-query";
import { candiyPost } from "@/lib/api";

import type { ApiEnvelope, CheckupData, CheckupRequest } from "./type";

// 건강검진 조회(1차 호출 또는 추가인증 확인 호출 둘 다 이 훅으로 처리)
export const useCheckupMutation = () => {
  return useMutation({
    mutationFn: async (payload: CheckupRequest) =>
      candiyPost<ApiEnvelope<CheckupData>>("/v1/nhis/checkup", payload),
  });
};
