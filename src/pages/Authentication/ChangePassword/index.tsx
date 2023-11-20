import { useContext, useState } from "react";
import Input from "../../../components/Input";
import { GlobalContext } from "../../../context";
import { POST } from "../../../service";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

function ChangePassword() {
  const { setLoading }: any = useContext(GlobalContext);
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const options = {
      url: "user/change-password",
      body: {
        token: searchParams.get("_ft"),
        password,
        _id: searchParams.get("_id"),
      },
    };
    await POST(options)
      .then((response) => {
        if (response && response.message == "OK") {
          toast.success("Đổi mật khẩu thành công!");
          setTimeout(() => {
            if (response) navigate(`/callback?token=${response.accessToken}`);
          }, 3000);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-black p-8 rounded-[5px] border border-grey max-w-[400px] w-full relative">
      <h3 className="m-0 text-[26px] mb-[24px]">Đổi mật khẩu</h3>
      <Input
        setValue={setPassword}
        type="password"
        rules={[{ min: 6, message: "Mật khẩu ít nhật 6 ký tự" }]}
        placeholder="Mật khẩu"
      />
      <Input
        type="password"
        rePassword={password}
        placeholder="Nhập lại mật khẩu"
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleSubmit();
          }
        }}
      />
      <button
        type="submit"
        className="mb-5 mt-[10px] bg-primary w-full py-[10px] rounded-md font-semibold"
        onClick={handleSubmit}
      >
        Đổi mật khẩu
      </button>
    </div>
  );
}

export default ChangePassword;
