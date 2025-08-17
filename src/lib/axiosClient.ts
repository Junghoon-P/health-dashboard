import axios from "axios";

// 환경에 따라 다른 base URL 사용
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    // 개발 환경: Vite 프록시 사용
    return "/candiy";
  } else {
    // 프로덕션 환경: 직접 API 호출 (CORS 설정 필요) 또는 Vercel 프록시 사용
    return "/candiy"; // Vercel 프록시 사용
    // return "https://api.candiy.io"; // 직접 호출 시 (CORS 설정 필요)
  }
};

export const axiosClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 15000, // 필요 시 타임아웃 설정
});

// 요청 인터셉터: API Key 자동 부착
axiosClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_CANDIY_API_KEY as string | undefined;

  if (!apiKey) {
    return Promise.reject(
      new Error("환경변수 VITE_CANDIY_API_KEY가 설정되지 않았습니다.")
    );
  }

  config.headers = config.headers ?? {};
  config.headers["x-api-key"] = apiKey;

  return config;
});

// 응답 인터셉터: 에러 메시지 통일
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "알 수 없는 오류가 발생했습니다.";
    return Promise.reject(new Error(msg));
  }
);
