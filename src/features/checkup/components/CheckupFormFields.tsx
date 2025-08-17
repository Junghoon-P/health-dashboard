import { FormField, InputField, SelectField } from "@/components";
import type { CheckupRequest } from "@/features/checkup/type";
import {
  LOGIN_TYPE_OPTIONS,
  TELECOM_OPTIONS,
  INQUIRY_TYPE_OPTIONS,
  generateYearOptions,
} from "@/constants/checkup";

interface CheckupFormFieldsProps {
  formData: Omit<CheckupRequest, "isContinue" | "multiFactorInfo">;
  updateFormData: (field: keyof CheckupRequest, value: string) => void;
  onGenerateId: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const CheckupFormFields = ({
  formData,
  updateFormData,
  onGenerateId,
  onSubmit,
  isLoading,
}: CheckupFormFieldsProps) => {
  const yearOptions = generateYearOptions();

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">건강검진 조회</h2>
      </div>

      <form className="px-6 py-4">
        <div className="space-y-0">
          <FormField label="요청 ID">
            <div className="flex gap-2">
              <InputField
                value={formData.id}
                onChange={(value) => updateFormData("id", value)}
                placeholder="요청 식별 ID"
              />
              <button
                type="button"
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap"
                onClick={onGenerateId}
              >
                생성
              </button>
            </div>
          </FormField>

          <FormField label="간편인증 방식" required>
            <SelectField
              value={formData.loginTypeLevel}
              onChange={(value) => updateFormData("loginTypeLevel", value)}
              options={LOGIN_TYPE_OPTIONS}
            />
          </FormField>

          <FormField label="본명" required>
            <InputField
              value={formData.legalName}
              onChange={(value) => updateFormData("legalName", value)}
              placeholder="홍길동"
            />
          </FormField>

          <FormField label="생년월일" required>
            <InputField
              value={formData.birthdate}
              onChange={(value) => updateFormData("birthdate", value)}
              placeholder="19900101"
              maxLength={8}
              transform={(value) => value.replace(/[^0-9]/g, "")}
            />
          </FormField>

          <FormField label="전화번호" required>
            <InputField
              value={formData.phoneNo}
              onChange={(value) => updateFormData("phoneNo", value)}
              placeholder="01012341234"
              maxLength={11}
              transform={(value) => value.replace(/[^0-9]/g, "")}
            />
          </FormField>

          <FormField label="통신사">
            <SelectField
              value={formData.telecom}
              onChange={(value) => updateFormData("telecom", value)}
              options={TELECOM_OPTIONS}
            />
          </FormField>

          <FormField label="조회 시작 연도">
            <SelectField
              value={formData.startDate}
              onChange={(value) => updateFormData("startDate", value)}
              options={yearOptions}
            />
          </FormField>

          <FormField label="조회 종료 연도">
            <SelectField
              value={formData.endDate}
              onChange={(value) => updateFormData("endDate", value)}
              options={yearOptions}
            />
          </FormField>

          <FormField label="조회 구분">
            <SelectField
              value={formData.inquiryType || "0"}
              onChange={(value) => updateFormData("inquiryType", value)}
              options={INQUIRY_TYPE_OPTIONS}
            />
          </FormField>
        </div>
      </form>

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
        <button
          className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "조회 중..." : "건강검진 조회"}
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          * 표시된 항목은 필수 입력 항목입니다.
        </p>
      </div>
    </div>
  );
};

export default CheckupFormFields;
