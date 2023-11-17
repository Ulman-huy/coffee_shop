import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import loading from "../../assets/lottie/loading.json";
import { useDispatch } from "react-redux";
import { getMe } from "../../redux/reducer/userReducer";

function Callback() {
  const [searchParams] = useSearchParams();
  const [_cookies, setCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirect = async () => {
    const token = searchParams.get("token");
    if (token) {
      setCookie("accessToken", token, { path: "/" });
      await dispatch(getMe() as any);
    }
    navigate("/");
  };
  useEffect(() => {
    handleRedirect();
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[25%]">
        <Lottie animationData={loading} loop />
      </div>
    </div>
  );
}

export default Callback;
