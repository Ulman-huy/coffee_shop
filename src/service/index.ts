import instanse from "../config/axios";
import { toast } from "react-toastify";

type Props = {
  url: string;
  params?: any;
  headers?: any;
  body?: any;
};

export const GET = async ({ url, params, headers }: Props) => {
  try {
    return (await instanse.get(url, { params, headers })).data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
export const POST = async ({ url, params, body, headers }: Props) => {
  try {
    return (await instanse.post(url, body, { params, headers })).data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
export const PUT = async ({ url, params, body, headers }: Props) => {
  try {
    return (await instanse.put(url, body, { params, headers })).data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const DELETE = async ({ url, params, headers }: Props) => {
  try {
    return (await instanse.delete(url, { params, headers })).data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
