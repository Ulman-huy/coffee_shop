import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMe } from "../../redux/reducer/userReducer";
import { GlobalContext } from "../../context";
import instanse from "../../config/axios";

function Callback() {
  const { setLoading }: any = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const [_cookies, setCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirect = async () => {
    setLoading(true);
    const token = searchParams.get("token");
    const redirect = searchParams.get("redirect");
    if (token) {
      setCookie("accessToken", token, { path: "/" });
      instanse.interceptors.request.use((config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      });
      await dispatch(getMe(token) as any);
    }
    if (redirect) {
      setLoading(false);
      navigate(redirect);
      return;
    }
    navigate("/");
    setLoading(false);
  };
  useEffect(() => {
    handleRedirect();
  }, []);
  return <div className="h-screen"></div>;
}

export default Callback;
