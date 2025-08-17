import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import type { CheckupData, CheckupRequest } from "@/features/checkup/type";

type CheckupStep = "initial" | "pending_auth" | "completed" | "error";

type MultiFactorInfo = {
  transactionId: string;
  jobIndex: number;
  threadIndex: number;
  multiFactorTimestamp: number;
};

interface CheckupState {
  // 상태
  step: CheckupStep;
  multiFactorInfo: MultiFactorInfo | null;
  finalData: CheckupData | null;
  formData: Omit<CheckupRequest, "isContinue" | "multiFactorInfo"> | null;
  isLoading: boolean;
  error: Error | null;
}

interface CheckupActions {
  // 순수한 상태 업데이트 액션들
  setFormData: (
    data: Omit<CheckupRequest, "isContinue" | "multiFactorInfo">
  ) => void;
  setStep: (step: CheckupStep) => void;
  setMultiFactorInfo: (info: MultiFactorInfo | null) => void;
  setFinalData: (data: CheckupData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  resetStore: () => void;
}

type CheckupStore = CheckupState & CheckupActions;

const initialState: CheckupState = {
  step: "initial",
  multiFactorInfo: null,
  finalData: null,
  formData: null,
  isLoading: false,
  error: null,
};

export const useCheckupStore = create<CheckupStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        ...initialState,

        setFormData: (data) => {
          set({ formData: data });
        },

        setStep: (step) => {
          set({ step });
        },

        setMultiFactorInfo: (multiFactorInfo) => {
          set({ multiFactorInfo });
        },

        setFinalData: (finalData) => {
          set({ finalData });
        },

        setLoading: (isLoading) => {
          set({ isLoading });
        },

        setError: (error) => {
          set({ error });
        },

        resetStore: () => {
          set(initialState);
        },
      }),
      {
        name: "checkup-store",
        partialize: (state) => ({
          step: state.step,
          multiFactorInfo: state.multiFactorInfo,
          finalData: state.finalData,
          formData: state.formData,
        }),
      }
    )
  )
);

// 페이지 이동을 위한 hook
export const useCheckupNavigation = () => {
  const step = useCheckupStore((state) => state.step);

  return {
    shouldRedirectTo: (): string | null => {
      switch (step) {
        case "initial":
          return "/checkup/start";
        case "error":
          return "/checkup/error";
        case "pending_auth":
          return "/checkup/verify";
        case "completed":
          return "/checkup/result";
        default:
          return null;
      }
    },
    currentStep: step,
  };
};
