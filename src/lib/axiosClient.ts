import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://api.candiy.io",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: API Key 추가
axiosClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_CANDIY_API_KEY as string | undefined;
  if (apiKey) {
    config.headers["x-api-key"] = apiKey;
  }
  return config;
});

// 응답 인터셉터: 에러 메시지 공통 처리
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg = error?.response?.data?.message || error.message;
    return Promise.reject(new Error(msg));
  }
);
