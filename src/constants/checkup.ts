// 간편인증 방식 옵션
export const LOGIN_TYPE_OPTIONS = [
  { value: "1", label: "카카오톡" },
  { value: "3", label: "삼성패스" },
  { value: "4", label: "국민은행" },
  { value: "5", label: "통신사(PASS)" },
  { value: "6", label: "네이버" },
  { value: "7", label: "신한은행" },
  { value: "8", label: "토스" },
  { value: "9", label: "뱅크샐러드" },
  { value: "10", label: "하나은행" },
  { value: "11", label: "NH모바일인증서" },
];

// 통신사 옵션
export const TELECOM_OPTIONS = [
  { value: "0", label: "SKT" },
  { value: "1", label: "KT" },
  { value: "2", label: "LG U+" },
];

// 조회 구분 옵션
export const INQUIRY_TYPE_OPTIONS = [
  { value: "0", label: "일반조회" },
  { value: "1", label: "상세조회(PDF포함)" },
  { value: "3", label: "상세조회+문진결과" },
  { value: "4", label: "문진결과" },
];

// 연도 범위 생성 함수
export const generateYearOptions = (startYear: number = 1900) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: `${currentYear - i}년`,
  }));
};
