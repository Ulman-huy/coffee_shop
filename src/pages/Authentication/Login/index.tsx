import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FacebookBlueIcon, GoogleIcon } from "../../../components/Icons";
import Input from "../../../components/Input";
import { GlobalContext } from "../../../context";
import { POST } from "../../../service";
import { toast } from "react-toastify";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../main";

function Login() {
  const { setLoading }: any = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const options = {
      url: "login",
      body: {
        email,
        password,
      },
    };
    await POST(options)
      .then((response: any) => {
        if (response) navigate(`/callback?token=${response.accessToken}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    await signInWithPopup(auth, provider)
      .then(async (response) => {
        const { email, displayName, photoURL, emailVerified } = response.user;
        const options = {
          url: "socials",
          body: {
            username: displayName,
            email: email,
            verify: emailVerified,
            avatar: photoURL,
          },
        };
        await POST(options)
          .then((response) => {
            if (response) navigate(`/callback?token=${response.accessToken}`);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoginFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (response) => {
        const { email, displayName, photoURL, emailVerified } = response.user;
        const options = {
          url: "socials",
          body: {
            username: displayName,
            email: email,
            verify: emailVerified,
            avatar: photoURL,
          },
        };
        await POST(options)
          .then((response) => {
            if (response) navigate(`/callback?token=${response.accessToken}`);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="bg-black p-8 rounded-[5px] border border-grey max-w-[400px] w-full relative">
      <h3 className="m-0 text-[26px] mb-[24px]">Đăng nhập</h3>
      <Input
        setValue={setEmail}
        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        placeholder="Email"
      />
      <Input
        setValue={setPassword}
        type="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        placeholder="Mật khẩu"
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleSubmit();
          }
        }}
      />
      <button
        type="submit"
        className="mb-6 mt-[10px] bg-primary w-full py-[10px] rounded-md font-semibold"
        onClick={handleSubmit}
      >
        Đăng nhập
      </button>
      <div className="flex justify-between items-center pb-6">
        <div className="bg-[#dddddd80] w-full h-[1px]"></div>
        <p className="px-3 m-0 text-[11px]">HOẶC</p>
        <div className="bg-[#dddddd80] w-full h-[1px]"></div>
      </div>
      <div className="flex justify-between items-center">
        <div
          onClick={handleLoginFacebook}
          className="flex items-center cursor-pointer justify-center border border-grey h-10 w-1/2 mx-2 text-[14px] bg-white text-black font-medium rounded-[5px] gap-1"
        >
          <FacebookBlueIcon />
          <span>Facebook</span>
        </div>
        <div
          onClick={handleLoginGoogle}
          className="flex items-center cursor-pointer justify-center border border-grey h-10 w-1/2 mx-2 text-[14px] bg-white text-black font-medium rounded-[5px] gap-1"
        >
          <GoogleIcon />
          <span>Google</span>
        </div>
      </div>
      <div className="text-center mt-6 text-[15px] text-grey">
        <span>Bạn mới biết đến coffeeHouse?</span>
        <Link to="/sigup" className="text-primary ms-1">
          Đăng ký
        </Link>
      </div>
      <div className="flex justify-center">
        <Link to="/forgot-password" className="text-primary ms-1">
          Quên mật khẩu
        </Link>
      </div>
    </div>
  );
}

export default Login;
