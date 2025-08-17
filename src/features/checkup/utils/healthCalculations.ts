import type { Overview } from "@/features/checkup/type";

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
