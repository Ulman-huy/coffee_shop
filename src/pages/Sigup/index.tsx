import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sigup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-black p-8 rounded-[5px] border border-grey max-w-[400px] w-full relative">
      <h3 className="m-0 text-[26px] mb-[24px]">Đăng ký</h3>
      <div className="text-error">{message}</div>
      <div className="py-[13px] relative">
        <input
          type="text"
          placeholder="Họ tên"
          value={username}
          className="w-full p-3 text-[15px] rounded-[5px] text-black"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="py-[13px] relative">
        <input
          type="text"
          placeholder="Email"
          value={email}
          className="w-full p-3 text-[15px] rounded-[5px] text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="py-[13px] relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-3 text-[15px] rounded-[5px] text-black"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2 right-3 text-black transition-all hover:text-primary cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <div className="py-[13px] relative">
        <input
          type={showRePassword ? "text" : "password"}
          placeholder="Nhập lại khẩu"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="w-full p-3 text-[15px] rounded-[5px] text-black"
        />

        <span
          className="absolute top-1/2 -translate-y-1/2 right-3 text-black transition-all hover:text-primary cursor-pointer"
          onClick={() => setShowRePassword(!showRePassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <button
        type="submit"
        className="mb-6 mt-[10px] bg-primary w-full py-[10px] rounded-md font-semibold"
        // onClick={handleSubmit}
      >
        Đăng ký
      </button>
      <div className="flex justify-between items-center pb-6">
        <div className="bg-[#dddddd80] w-full h-[1px]"></div>
        <p className="px-3 m-0 text-[11px]">HOẶC</p>
        <div className="bg-[#dddddd80] w-full h-[1px]"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center border border-grey h-10 w-1/2 mx-2 text-[14px] bg-white text-black font-medium rounded-[5px] gap-1">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              viewBox="0 0 512 512"
            >
              <path
                fill="#1877f2"
                d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
              />
            </svg>
          </span>
          <span>Facebook</span>
        </div>
        <div className="flex items-center justify-center border border-grey h-10 w-1/2 mx-2 text-[14px] bg-white text-black font-medium rounded-[5px] gap-1">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              viewBox="0 0 488 512"
            >
              <path
                fill="#ee4d2d"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              />
            </svg>
          </span>
          <span>Google</span>
        </div>
      </div>
      <div className="mt-[6px] text-[13px] flex text-center justify-center">
        <p className="max-w-[300px] mb-0">
          Bằng việc đăng kí, bạn đã đồng ý với{" "}
          <span className="font-pacifico">coffeHouse</span> về{" "}
          <Link to="" className="text-primary">
            Điều khoản dịch vụ
          </Link>{" "}
          &
          <Link to="" className="text-primary">
            Chính sách bảo mật
          </Link>
        </p>
      </div>

      <div className="text-center mt-6 text-[15px] text-grey">
        <span>Bạn đã có tài khoản?</span>
        <Link to="/login" className="text-primary ms-1">
          Đăng Nhập?
        </Link>
      </div>
    </div>
  );
}

export default Sigup;
