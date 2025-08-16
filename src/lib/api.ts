import { axiosClient } from "./axiosClient";

export const candiyPost = async <T>(path: string, body: unknown) => {
  const res = await axiosClient.post<T>(path, body);
  return res.data;
};
