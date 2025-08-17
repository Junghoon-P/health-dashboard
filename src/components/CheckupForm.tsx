import { useState } from "react";
import type { CheckupRequest } from "@/features/checkup/type";
import {
  LOGIN_TYPE_OPTIONS,
  TELECOM_OPTIONS,
  INQUIRY_TYPE_OPTIONS,
  generateYearOptions,
} from "@/constants/checkup";
import FormField from "@/components/ui/FormField";

interface CheckupFormProps {
  onSubmit: (data: CheckupRequest) => void;
  isLoading: boolean;
  error?: string | null;
}

const CheckupForm = ({ onSubmit, isLoading, error }: CheckupFormProps) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = generateYearOptions();

  const [formData, setFormData] = useState<CheckupRequest>({
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

  const handleSubmit = () => {
    if (!formData.legalName || !formData.birthdate || !formData.phoneNo) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    onSubmit(formData);
  };

  const renderInput = (
    value: string,
    onChange: (value: string) => void,
    placeholder?: string,
    maxLength?: number,
    transform?: (value: string) => string
  ) => (
    <input
      type="text"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => {
        const inputValue = e.target.value;
        const transformedValue = transform ? transform(inputValue) : inputValue;
        onChange(transformedValue);
      }}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );

  const renderSelect = (
    value: string,
    onChange: (value: string) => void,
    options: { value: string; label: string }[]
  ) => (
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">건강검진 조회</h2>
      </div>

      <form className="px-6 py-4">
        <div className="space-y-0">
          <FormField label="요청 ID">
            <div className="flex gap-2">
              {renderInput(
                formData.id,
                (value) => updateFormData("id", value),
                "요청 식별 ID"
              )}
              <button
                type="button"
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap"
                onClick={() => updateFormData("id", generateUUID())}
              >
                생성
              </button>
            </div>
          </FormField>

          <FormField label="간편인증 방식" required>
            {renderSelect(
              formData.loginTypeLevel,
              (value) => updateFormData("loginTypeLevel", value),
              LOGIN_TYPE_OPTIONS
            )}
          </FormField>

          <FormField label="본명" required>
            {renderInput(
              formData.legalName,
              (value) => updateFormData("legalName", value),
              "홍길동"
            )}
          </FormField>

          <FormField label="생년월일" required>
            {renderInput(
              formData.birthdate,
              (value) => updateFormData("birthdate", value),
              "19900101",
              8,
              (value) => value.replace(/[^0-9]/g, "")
            )}
          </FormField>

          <FormField label="전화번호" required>
            {renderInput(
              formData.phoneNo,
              (value) => updateFormData("phoneNo", value),
              "01012341234",
              11,
              (value) => value.replace(/[^0-9]/g, "")
            )}
          </FormField>

          <FormField label="통신사">
            {renderSelect(
              formData.telecom,
              (value) => updateFormData("telecom", value),
              TELECOM_OPTIONS
            )}
          </FormField>

          <FormField label="조회 시작 연도">
            {renderSelect(
              formData.startDate,
              (value) => updateFormData("startDate", value),
              yearOptions
            )}
          </FormField>

          <FormField label="조회 종료 연도">
            {renderSelect(
              formData.endDate,
              (value) => updateFormData("endDate", value),
              yearOptions
            )}
          </FormField>

          <FormField label="조회 구분">
            {renderSelect(
              formData.inquiryType || "0",
              (value) => updateFormData("inquiryType", value),
              INQUIRY_TYPE_OPTIONS
            )}
          </FormField>
        </div>
      </form>

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
        <button
          className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "조회 중..." : "건강검진 조회"}
        </button>

        {error && (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            오류가 발생했습니다: {error}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-3 text-center">
          * 표시된 항목은 필수 입력 항목입니다.
        </p>
      </div>
    </div>
  );
};

export default CheckupForm;
