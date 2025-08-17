import type { Overview, Reference } from "@/features/checkup/type";

// 건강검진 판정 타입
export type EvaluationType =
  | "정A"
  | "정B"
  | "주의"
  | "의심"
  | "고∙당"
  | "유질"
  | "일반"
  | "직업"
  | "단순"
  | "휴무";

// severity 타입
export type SeverityType = "normal" | "caution" | "warning" | "danger";

// 판정 정보 타입
export type EvaluationInfo = {
  label: string;
  description: string;
  severity: SeverityType;
};

// severity별 스타일 매핑
export const SEVERITY_STYLES: Record<SeverityType, string> = {
  normal: "bg-green-100 text-green-800",
  caution: "bg-yellow-100 text-yellow-800",
  warning: "bg-orange-100 text-orange-800",
  danger: "bg-red-100 text-red-800",
};

// 건강검진 판정 매핑
export const EVALUATION_MAP: Record<EvaluationType, EvaluationInfo> = {
  정A: { label: "정상 A", description: "정상", severity: "normal" },
  정B: { label: "정상 B", description: "정상", severity: "normal" },
  주의: {
    label: "주의",
    description: "생활습관 개선 필요",
    severity: "caution",
  },
  의심: { label: "질환의심", description: "정밀검사 권장", severity: "danger" },
  "고∙당": {
    label: "고혈압∙당뇨",
    description: "치료 및 관리 필요",
    severity: "danger",
  },
  유질: {
    label: "유소견질환",
    description: "지속적 관리 필요",
    severity: "warning",
  },
  일반: { label: "일반검진", description: "", severity: "normal" },
  직업: { label: "직업성질환", description: "", severity: "normal" },
  단순: { label: "단순검진", description: "", severity: "normal" },
  휴무: { label: "휴무", description: "", severity: "normal" },
};

// 판정 정보 조회 함수
export const getEvaluationInfo = (evaluation?: string): EvaluationInfo => {
  return (
    EVALUATION_MAP[evaluation as EvaluationType] || {
      label: "미정",
      description: "",
      severity: "normal",
    }
  );
};

// severity에 따른 스타일 조회 함수
export const getSeverityStyle = (severity: SeverityType): string => {
  return SEVERITY_STYLES[severity];
};

// BMI 계산 및 상태 판정
export const calculateBMI = (height?: string, weight?: string) => {
  if (!height || !weight) return null;

  const h = parseFloat(height.replace(/[^\d.]/g, "")) / 100; // cm -> m
  const w = parseFloat(weight.replace(/[^\d.]/g, ""));

  if (h <= 0 || w <= 0) return null;

  const bmi = w / (h * h);
  return {
    value: bmi,
    status:
      bmi < 18.5 ? "저체중" : bmi < 25 ? "정상" : bmi < 30 ? "과체중" : "비만",
    color:
      bmi < 18.5
        ? "text-blue-600"
        : bmi < 25
        ? "text-green-600"
        : bmi < 30
        ? "text-yellow-600"
        : "text-red-600",
  };
};

// 혈압 상태 판정
export const getBloodPressureStatus = (bloodPressure?: string) => {
  if (!bloodPressure) return null;

  const [systolic, diastolic] = bloodPressure
    .split("/")
    .map((v) => parseFloat(v.replace(/[^\d]/g, "")));

  if (!systolic || !diastolic) return null;

  const status =
    systolic < 120 && diastolic < 80
      ? "정상"
      : systolic < 140 && diastolic < 90
      ? "주의"
      : "위험";

  const color =
    status === "정상"
      ? "text-green-600"
      : status === "주의"
      ? "text-yellow-600"
      : "text-red-600";

  return { systolic, diastolic, status, color };
};

// 혈당 상태 판정
export const getBloodSugarStatus = (glucose?: string) => {
  if (!glucose) return null;

  const value = parseFloat(glucose.replace(/[^\d]/g, ""));
  if (!value) return null;

  const status = value < 100 ? "정상" : value < 126 ? "전당뇨" : "당뇨";

  const color =
    status === "정상"
      ? "text-green-600"
      : status === "전당뇨"
      ? "text-yellow-600"
      : "text-red-600";

  return { value, status, color };
};

// 콜레스테롤 상태 판정
export const getCholesterolStatus = (overview: Overview) => {
  const total = overview.totalCholesterol
    ? parseFloat(overview.totalCholesterol.replace(/[^\d]/g, ""))
    : null;
  const hdl = overview.HDLCholesterol
    ? parseFloat(overview.HDLCholesterol.replace(/[^\d]/g, ""))
    : null;
  const ldl = overview.LDLCholesterol
    ? parseFloat(overview.LDLCholesterol.replace(/[^\d]/g, ""))
    : null;
  const tg = overview.triglyceride
    ? parseFloat(overview.triglyceride.replace(/[^\d]/g, ""))
    : null;

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    return value < thresholds[0]
      ? "정상"
      : value < thresholds[1]
      ? "주의"
      : "위험";
  };

  return {
    total: total
      ? { value: total, status: getStatusColor(total, [200, 240]) }
      : null,
    hdl: hdl ? { value: hdl, status: hdl >= 40 ? "정상" : "주의" } : null,
    ldl: ldl ? { value: ldl, status: getStatusColor(ldl, [130, 160]) } : null,
    triglyceride: tg
      ? { value: tg, status: getStatusColor(tg, [150, 200]) }
      : null,
  };
};

// 간기능 상태 판정
export const getLiverStatus = (overview: Overview) => {
  const ast = overview.AST
    ? parseFloat(overview.AST.replace(/[^\d]/g, ""))
    : null;
  const alt = overview.ALT
    ? parseFloat(overview.ALT.replace(/[^\d]/g, ""))
    : null;
  const gpt = overview.yGPT
    ? parseFloat(overview.yGPT.replace(/[^\d]/g, ""))
    : null;

  const getStatus = (value: number, normal: number) => {
    return value <= normal ? "정상" : value <= normal * 2 ? "주의" : "위험";
  };

  return {
    ast: ast ? { value: ast, status: getStatus(ast, 40) } : null,
    alt: alt ? { value: alt, status: getStatus(alt, 40) } : null,
    gpt: gpt ? { value: gpt, status: getStatus(gpt, 60) } : null,
  };
};

// 건강 점수 계산
export const calculateHealthScore = (overview: Overview) => {
  let score = 100;

  // BMI 점수
  const bmi = calculateBMI(overview.height, overview.weight);
  if (bmi) {
    if (bmi.status !== "정상") score -= 15;
  }

  // 혈압 점수
  const bp = getBloodPressureStatus(overview.bloodPressure);
  if (bp) {
    if (bp.status === "주의") score -= 10;
    else if (bp.status === "위험") score -= 20;
  }

  // 혈당 점수
  const bs = getBloodSugarStatus(overview.fastingBloodGlucose);
  if (bs) {
    if (bs.status === "전당뇨") score -= 15;
    else if (bs.status === "당뇨") score -= 25;
  }

  // 콜레스테롤 점수
  const chol = getCholesterolStatus(overview);
  if (chol.total || chol.hdl || chol.ldl) {
    let cholDeduction = 0;
    if (chol.total?.status === "주의") cholDeduction += 5;
    else if (chol.total?.status === "위험") cholDeduction += 10;
    if (chol.hdl?.status === "주의") cholDeduction += 5;
    if (chol.ldl?.status === "주의") cholDeduction += 5;
    else if (chol.ldl?.status === "위험") cholDeduction += 10;
    score -= Math.min(cholDeduction, 20);
  }

  return Math.max(score, 0);
};

// referenceList를 활용한 건강상태 메시지 생성
export const generateHealthMessages = (
  overview: Overview,
  referenceList?: Reference[]
) => {
  const messages: string[] = [];

  if (!referenceList) return messages;

  // 참고치에서 정상A, 정상B, 질환의심 기준 찾기
  const normalA = referenceList.find((ref) => ref.refType === "정상A");
  const normalB = referenceList.find((ref) => ref.refType === "정상B");
  const disease = referenceList.find((ref) => ref.refType === "질환의심");

  // BMI 메시지
  const bmi = calculateBMI(overview.height, overview.weight);
  if (bmi) {
    if (bmi.status === "저체중") {
      messages.push(
        "체중이 부족합니다. 균형 잡힌 식단과 근력 운동을 추천합니다."
      );
    } else if (bmi.status === "과체중" || bmi.status === "비만") {
      messages.push(
        "체중 관리가 필요합니다. 유산소 운동과 식단 조절을 권장합니다."
      );
    } else {
      messages.push("BMI가 정상 범위입니다. 현재 상태를 유지하세요.");
    }
  }

  // 혈압 메시지
  const bp = getBloodPressureStatus(overview.bloodPressure);
  if (bp) {
    if (bp.status === "위험") {
      messages.push(
        "혈압이 높습니다. 의료진 상담과 생활습관 개선이 필요합니다."
      );
    } else if (bp.status === "주의") {
      messages.push(
        "혈압이 약간 높습니다. 염분 섭취를 줄이고 규칙적인 운동을 하세요."
      );
    } else {
      messages.push("혈압이 정상 범위입니다.");
    }
  }

  // 혈당 메시지
  const bs = getBloodSugarStatus(overview.fastingBloodGlucose);
  if (bs) {
    if (bs.status === "당뇨") {
      messages.push(
        "혈당이 당뇨 범위입니다. 즉시 전문의 상담을 받으시기 바랍니다."
      );
    } else if (bs.status === "전당뇨") {
      messages.push(
        "혈당이 높습니다. 당분 섭취를 줄이고 체중 관리가 필요합니다."
      );
    } else {
      messages.push("혈당이 정상 범위입니다.");
    }
  }

  // 콜레스테롤 메시지
  const chol = getCholesterolStatus(overview);
  const abnormalChol = [];
  if (chol.total?.status !== "정상") abnormalChol.push("총콜레스테롤");
  if (chol.ldl?.status !== "정상") abnormalChol.push("LDL");
  if (chol.hdl?.status !== "정상") abnormalChol.push("HDL");
  if (chol.triglyceride?.status !== "정상") abnormalChol.push("중성지방");

  if (abnormalChol.length > 0) {
    messages.push(
      `${abnormalChol.join(
        ", "
      )} 수치에 주의가 필요합니다. 기름진 음식을 줄이고 생선, 견과류 섭취를 늘리세요.`
    );
  } else if (chol.total || chol.hdl || chol.ldl || chol.triglyceride) {
    messages.push("콜레스테롤 수치가 양호합니다.");
  }

  // 간기능 메시지
  const liver = getLiverStatus(overview);
  const abnormalLiver = [];
  if (liver.ast?.status !== "정상") abnormalLiver.push("AST");
  if (liver.alt?.status !== "정상") abnormalLiver.push("ALT");
  if (liver.gpt?.status !== "정상") abnormalLiver.push("γ-GTP");

  if (abnormalLiver.length > 0) {
    messages.push(
      `간기능 수치(${abnormalLiver.join(
        ", "
      )})에 이상이 있습니다. 금주와 규칙적인 생활을 권장합니다.`
    );
  } else if (liver.ast || liver.alt || liver.gpt) {
    messages.push("간기능 수치가 정상입니다.");
  }

  // 기타 검사 결과 메시지
  if (overview.chestXrayResult && !overview.chestXrayResult.includes("정상")) {
    messages.push(
      "흉부 검사에서 이상 소견이 있습니다. 전문의 상담을 받으시기 바랍니다."
    );
  }

  if (overview.proteinuria && overview.proteinuria !== "음성") {
    messages.push(
      "요단백 검사에서 이상이 발견되었습니다. 신장 기능 검사를 권장합니다."
    );
  }

  return messages;
};

// 종합 건강 상태 평가
export const getOverallHealthAssessment = (
  overview: Overview,
  referenceList?: Reference[]
) => {
  const healthScore = calculateHealthScore(overview);
  const messages = generateHealthMessages(overview, referenceList);

  let assessment = "";
  if (healthScore >= 80) {
    assessment = "전반적으로 건강한 상태입니다. 현재 생활습관을 유지하세요.";
  } else if (healthScore >= 60) {
    assessment =
      "일부 개선이 필요한 항목이 있습니다. 생활습관 개선을 통해 건강을 관리하세요.";
  } else {
    assessment =
      "건강 관리에 각별한 주의가 필요합니다. 전문의 상담을 권장합니다.";
  }

  return {
    score: healthScore,
    assessment,
    messages,
  };
};
