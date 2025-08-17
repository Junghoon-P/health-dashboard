import { useState } from "react";
import type { CheckupRequest } from "@/features/checkup/type";

interface CheckupFormProps {
  onSubmit: (data: CheckupRequest) => void;
  isLoading: boolean;
  error?: string | null;
}

const CheckupForm = ({ onSubmit, isLoading, error }: CheckupFormProps) => {
  const [formData, setFormData] = useState<CheckupRequest>({
    id: "",
    loginTypeLevel: "1",
    legalName: "",
    birthdate: "",
    phoneNo: "",
    telecom: "0",
    startDate: "2020",
    endDate: "2024",
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

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4">건강검진 조회</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* ID 필드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            요청 ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.id}
              onChange={(e) => updateFormData("id", e.target.value)}
              placeholder="요청 식별 ID"
            />
            <button
              type="button"
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={() => updateFormData("id", generateUUID())}
            >
              생성
            </button>
          </div>
        </div>

        {/* 간편인증 방식 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            간편인증 방식 *
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.loginTypeLevel}
            onChange={(e) => updateFormData("loginTypeLevel", e.target.value)}
          >
            <option value="1">카카오톡</option>
            <option value="3">삼성패스</option>
            <option value="4">국민은행</option>
            <option value="5">통신사(PASS)</option>
            <option value="6">네이버</option>
            <option value="7">신한은행</option>
            <option value="8">토스</option>
            <option value="9">뱅크샐러드</option>
            <option value="10">하나은행</option>
            <option value="11">NH모바일인증서</option>
          </select>
        </div>

        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            본명 *
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.legalName}
            onChange={(e) => updateFormData("legalName", e.target.value)}
            placeholder="홍길동"
          />
        </div>

        {/* 생년월일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            생년월일 *
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.birthdate}
            onChange={(e) =>
              updateFormData("birthdate", e.target.value.replace(/[^0-9]/g, ""))
            }
            placeholder="19900101"
            maxLength={8}
          />
        </div>

        {/* 전화번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            전화번호 *
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.phoneNo}
            onChange={(e) =>
              updateFormData("phoneNo", e.target.value.replace(/[^0-9]/g, ""))
            }
            placeholder="01012341234"
            maxLength={11}
          />
        </div>

        {/* 통신사 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            통신사
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.telecom}
            onChange={(e) => updateFormData("telecom", e.target.value)}
          >
            <option value="0">SKT</option>
            <option value="1">KT</option>
            <option value="2">LG U+</option>
          </select>
        </div>

        {/* 조회 시작 연도 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            조회 시작 연도
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.startDate}
            onChange={(e) => updateFormData("startDate", e.target.value)}
          >
            {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
              <option key={year} value={year.toString()}>
                {year}년
              </option>
            ))}
          </select>
        </div>

        {/* 조회 종료 연도 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            조회 종료 연도
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.endDate}
            onChange={(e) => updateFormData("endDate", e.target.value)}
          >
            {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
              <option key={year} value={year.toString()}>
                {year}년
              </option>
            ))}
          </select>
        </div>

        {/* 조회 구분 */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            조회 구분
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.inquiryType}
            onChange={(e) => updateFormData("inquiryType", e.target.value)}
          >
            <option value="0">일반조회</option>
            <option value="1">상세조회(PDF포함)</option>
            <option value="3">상세조회+문진결과</option>
            <option value="4">문진결과</option>
          </select>
        </div>
      </div>

      <button
        className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 font-medium"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "조회 중..." : "건강검진 조회"}
      </button>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          오류가 발생했습니다: {error}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3">
        * 표시된 항목은 필수 입력 항목입니다.
      </p>
    </div>
  );
};

export default CheckupForm;
