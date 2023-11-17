import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const token = cookies.get("accessToken");
export const BASE_API = import.meta.env.VITE_BASE_API;
