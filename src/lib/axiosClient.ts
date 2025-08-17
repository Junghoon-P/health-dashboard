import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "/candiy", // <-- 프록시 경유
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
