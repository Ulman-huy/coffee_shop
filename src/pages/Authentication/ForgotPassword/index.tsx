import { useContext, useState } from "react";
import Input from "../../../components/Input";
import { GlobalContext } from "../../../context";
import { POST } from "../../../service";
import { toast } from "react-toastify";

function ForgotPassword() {
  const { setLoading }: any = useContext(GlobalContext);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const options = {
      url: "user/forgot-password",
      body: {
        email,
      },
    };
    await POST(options)
      .then((response) => {
        if (response && response.message == "OK") {
          toast.success("Vui lòng kiểm tra Email!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-black p-8 rounded-[5px] border border-grey max-w-[400px] w-full relative">
      <h3 className="m-0 text-[26px] mb-[24px]">Quên mật khẩu</h3>
      <Input
        setValue={setEmail}
        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        placeholder="Email"
      />
      <button
        type="submit"
        className="mb-5 mt-[10px] bg-primary w-full py-[10px] rounded-md font-semibold"
        onClick={handleSubmit}
      >
        Xác nhận
      </button>
    </div>
  );
}

export default ForgotPassword;
