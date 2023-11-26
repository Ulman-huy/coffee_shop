import axios from "axios";
import { BASE_API } from "./contants";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import { store } from "../redux";

const cookies = new Cookies();
const token = cookies.get("accessToken");

const instanse = axios.create({
  baseURL: BASE_API,
  headers: {
    Authorization: token ? "Bearer " + token : "",
    post: {
      "Content-Type": "application/json",
    },
  },
});

instanse.interceptors.request.use((config) => {
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instanse.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (
      originalConfig.url !== "/auth/login" &&
      originalConfig.url !== "/auth/register" &&
      err.response
    ) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const token = await cookies.get("refreshToken");
          const res = await refreshToken(token);
          const { accessToken } = res.data;
          cookies.set("_tk", accessToken);
          cookies.set("accessToken", accessToken);
          return instanse(originalConfig);
        } catch (error: any) {
          if (error.response.status === 403) {
            toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
            store.dispatch({ type: "USER_LOGOUT" });
            window.location.href = "/";
          }
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(err);
  }
);

const refreshToken = async (token: string) => {
  return await axios.post(`${BASE_API}/auth/refresh`, {
    refreshToken: token,
  });
};

export default instanse;
