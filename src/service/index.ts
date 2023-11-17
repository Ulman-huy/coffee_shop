import instanse from "../config/axios";
import { toast } from "react-toastify";

type Props = {
  url: string;
  params?: any;
  headers?: any;
  body?: any;
  message?: string;
};

export const GET = async ({ url, params, headers, message }: Props) => {
  try {
    return (await instanse.get(url, { params, headers })).data;
  } catch (error) {
    toast.error(message);
  }
};
export const POST = async ({ url, params, body, headers, message }: Props) => {
  try {
    return (await instanse.post(url, body, { params, headers })).data;
  } catch (error) {
    toast.error(message);
  }
};
export const PUT = async ({ url, params, body, headers, message }: Props) => {
  try {
    return (await instanse.put(url, body, { params, headers })).data;
  } catch (error) {
    toast.error(message);
  }
};
