import axios from "axios";
import { BASE_API } from "./contants";
import { Cookies } from "react-cookie";

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

export default instanse;
