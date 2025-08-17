// 요청 페이로드
export type CheckupRequest = {
  id: string; // 요청 식별 아이디(SSO 구분값)
  loginTypeLevel: string; // 간편인증 로그인 구분 (1:카카오톡, 3:삼성패스, 4:국민은행, 5:통신사(PASS), 6:네이버, 7:신한은행, 8:토스, 9:뱅크샐러드, 10:하나은행, 11:NH모바일인증서)
  legalName: string; // 사용자 본명
  birthdate: string; // 생년월일(YYYYMMDD)
  phoneNo: string; // 사용자 명의 전화번호(하이픈 제거)
  telecom: string; // 통신사 (0:SKT, 1:KT, 2:LG U+)
  startDate: string; // 조회 시작 연도(yyyy)
  endDate: string; // 조회 종료 연도(yyyy)
  inquiryType?: string; // 조회 구분 (0:일반조회, 1:상세조회(PDF포함), 3:상세조회+문진결과, 4:문진결과, default:0)
  isContinue?: string; // 추가인증용 (0:cancel, 1:ok, default:1)
  multiFactorInfo?: {
    transactionId: string;
    jobIndex: number;
    threadIndex: number;
    multiFactorTimestamp: number;
  };
};

// 한번에보기 리스트
export type Overview = {
  checkupDate?: string; // 검진년도 (yyyy-mm-dd)
  height?: string; // 신장
  weight?: string; // 체중
  waists?: string; // 허리둘레
  BMI?: string; // 체질량지수
  vision?: string; // 시력
  hearing?: string; // 청력
  bloodPressure?: string; // 혈압 (수축기혈압/이완기혈압)
  proteinuria?: string; // 요단백
  hemoglobin?: string; // 혈색소
  fastingBloodGlucose?: string; // 식전혈당
  totalCholesterol?: string; // 총콜레스테롤
  HDLCholesterol?: string; // HDL콜레스테롤
  triglyceride?: string; // 트리글리세라이드
  LDLCholesterol?: string; // LDL콜레스테롤
  serumCreatinine?: string; // 혈청크레아티닌
  GFR?: string; // 신사구체여과율(GFR)
  AST?: string; // AST(SGOT)
  ALT?: string; // ALT(SGPT)
  yGPT?: string; // 감마지피티(y-GPT)
  chestXrayResult?: string; // 폐결핵 흉부질환
  osteoporosis?: string; // 골다공증
  evaluation?: string; // 판정 (정A, 정B, 주의, 의심, 고∙당, 유질, 일반, 직업, 단순, 휴무)
};

// 참고치 리스트
export type Reference = {
  refType?: string; // 구분 (ex: 단위, 정상A, 정상B, 질환의심)
  height?: string; // 신장 (ex: Cm)
  weight?: string; // 체중 (ex: Kg)
  waists?: string; // 허리둘레 (ex: Cm, 남90미만 여85미만)
  BMI?: string; // 체질량지수 (ex: kg/m2, 18.5-24.9)
  vision?: string; // 시력
  hearing?: string; // 청력
  bloodPressure?: string; // 혈압 (ex: mmHg)
  proteinuria?: string; // 요단백 (ex: 음성, 약양성)
  hemoglobin?: string; // 혈색소 (ex: g/dL)
  fastingBloodGlucose?: string; // 식전혈당 (ex: mg/dL)
  totalCholesterol?: string; // 총콜레스테롤 (ex: mg/dL)
  HDLCholesterol?: string; // HDL콜레스테롤 (ex: mg/dL)
  LDLCholesterol?: string; // LDL콜레스테롤 (ex: mg/dL)
  triglyceride?: string; // 트리글리세라이드 (ex: mg/dL)
  serumCreatinine?: string; // 혈청크레아티닌 (ex: mg/dL)
  GFR?: string; // 신사구체여과율(GFR) (ex: mL/min)
  AST?: string; // AST(SGOT) (ex: U/L)
  ALT?: string; // ALT(SGPT) (ex: U/L)
  yGPT?: string; // 감마지피티(y-GPT) (ex: U/L)
  chestXrayResult?: string; // 폐결핵 흉부질환 (ex: 정상 비활동성, 정상 및 비활동성의외의자)
  osteoporosis?: string; // 골다공증 (ex: T-score-1이상, -1~2.5초과)
};

// 문진정보
export type Questionnaire = unknown; // 구체적인 구조는 API 문서에 명시되지 않음

// 결과 리스트
export type ResultItem = {
  caseType?: string; // 구분 (0:본인검진)
  checkupType?: string; // 검진종류 (일반)
  checkupDate?: string; // 검진일자 (yyyy-mm-dd)
  organizationName?: string; // 기관명
  pdfData?: string; // 원문 PDF (실제 PDF Data를 String 형태로 제공)
  questionnaire?: Questionnaire[]; // 문진정보 List
};

// 최종 응답 데이터 타입
export type CheckupData = {
  patientName?: string; // 검진대상
  overviewList?: Overview[]; // 한번에보기 List (본인정보인 경우만 표시)
  referenceList?: Reference[]; // 참고치 List (본인정보인 경우만 표시)
  resultList?: ResultItem[]; // 결과 List (본인의 건강검진 결과정보)
  // 추가인증 흐름 관련 필드
  transactionId?: string;
  jobIndex?: number;
  threadIndex?: number;
  multiFactorTimestamp?: number;
};

// API 응답 봉투
export type ApiEnvelope<T> = {
  status: "success" | "error";
  message?: string;
  data?: T;
};
