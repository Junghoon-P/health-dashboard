import React from "react";
import { useCheckupStore } from "@/store/useCheckupStore";
import LoadingSpinner from "./LoadingSpinner";

const GlobalLoadingSpinner: React.FC = () => {
  const isLoading = useCheckupStore((state) => state.isLoading);
  const step = useCheckupStore((state) => state.step);

  const getMessage = () => {
    switch (step) {
      case "pending_auth":
        return "인증 정보를 확인하고 있습니다...";
      default:
        return "처리 중입니다...";
    }
  };

  return <LoadingSpinner isVisible={isLoading} message={getMessage()} />;
};

export default GlobalLoadingSpinner;
