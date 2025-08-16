// 요청 페이로드(문서/실제 환경에 맞춰 조정하세요)
export type CheckupRequest = {
  // 예시 필드(회사 제공 가이드에 맞게 교체)
  id?: string; // 사용자 식별용(선택)
  legalName: string; // 성명
  birthdate: string; // YYYYMMDD
  phoneNo: string; // 01012341234 (하이픈 제거)
  telecom: "SKT" | "KT" | "LGT" | "MVNO"; // 통신사
  loginTypeLevel: number; // 간편인증 레벨(가이드 참고)
  startDate?: string; // 조회 시작일(YYYYMMDD)
  endDate?: string; // 조회 종료일(YYYYMMDD)
  isContinue?: 0 | 1; // 추가인증 플로우에서 사용
  multiFactorInfo?: {
    transactionId: string;
    jobIndex: number;
    threadIndex: number;
    multiFactorTimestamp: string;
  };
};

// 응답 타입(문서/실제 상이 가능성 반영)
export type Overview = {
  checkupDate?: string;
  height?: string; // "175.2"
  weight?: string; // "70.1"
  BMI?: string; // "22.8"
  bloodPressure?: string; // "120/80"
  fastingBloodGlucose?: string; // "95"
};

export type ResultItem = {
  caseType?: string | number; // 문서엔 string, 실제 number 가능
  checkupType?: string;
  checkupDate?: string;
  organizationName?: string;
  pdfData?: string | null;
  // 문서엔 없지만 실제에 있을 수 있는 리스트
  infantsCheckupList?: unknown;
  infantsDentalList?: unknown;
};

export type CheckupData = {
  patientName?: string;
  overviewList?: Overview[];
  resultList?: ResultItem[];
  // 추가인증 흐름 관련 필드가 함께 내려올 수 있음
  transactionId?: string;
  jobIndex?: number;
  threadIndex?: number;
  multiFactorTimestamp?: string;
};

export type ApiEnvelope<T> = {
  status: "success" | "error";
  message?: string;
  data?: T;
};
