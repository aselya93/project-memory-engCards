import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API}api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let accessToken = "";

export function setAccessToken(token) {
  accessToken = token;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.authorization) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;

    if (error.response.status === 403 && !prevRequest.sent) {
      const response = await axiosInstance.get("/auth/refreshTokens");

      setAccessToken(response.data.accessToken);

      prevRequest.sent = true;

      prevRequest.headers.authorization = `Bearer ${accessToken}`;

      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);
