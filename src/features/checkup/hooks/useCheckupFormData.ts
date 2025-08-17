import { useState } from "react";
import type { CheckupRequest } from "@/features/checkup/type";

export const useCheckupFormData = () => {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState<
    Omit<CheckupRequest, "isContinue" | "multiFactorInfo">
  >({
    id: "",
    loginTypeLevel: "1",
    legalName: "",
    birthdate: "",
    phoneNo: "",
    telecom: "0",
    startDate: (currentYear - 1).toString(),
    endDate: currentYear.toString(),
    inquiryType: "0",
  });

  const generateUUID = () => {
    return "id-" + Math.random().toString(36).substr(2, 9);
  };

  const updateFormData = (field: keyof CheckupRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.legalName || !formData.birthdate || !formData.phoneNo) {
      alert("필수 항목을 모두 입력해주세요.");
      return false;
    }
    return true;
  };

  const generateId = () => {
    updateFormData("id", generateUUID());
  };

  return {
    formData,
    updateFormData,
    validateForm,
    generateId,
  };
};
