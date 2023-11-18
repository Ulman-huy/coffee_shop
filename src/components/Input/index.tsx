import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateEmail } from "../../utils";

type Props = React.ComponentProps<"input"> & {
  setValue?: any;
  rules?: any[];
  rePassword?: string;
};

function Input({
  setValue,
  rules,
  rePassword,
  className,
  type,
  ...props
}: Props) {
  const [message, setMessage] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);
  const [newType, setNewType] = useState(type);

  const handleCheckRules = (e: any) => {
    if (rePassword && rePassword != e.target.value) {
      setMessage("Mật khẩu nhập lại không chính xác!");
    } else {
      setMessage("");
    }
    if (rules?.length)
      rules.forEach((rule: any) => {
        Object.keys(rule).forEach((key: any) => {
          const value = e.target.value;
          if (key == "message") {
            return;
          }
          if (key == "required" && rule.required && !value) {
            setMessage(rule.message);
            return
          } else if (key == "email" && rule.email && !validateEmail(value)) {
            setMessage(rule.message);
            return
          } else if (key == "min" && value.trim().length < rule.min) {
            setMessage(rule.message);
            return
          } else {
            setMessage("");
          }
        });
      });
  };

  return (
    <div className="py-[13px] relative">
      <input
        {...props}
        type={newType}
        className={`w-full p-3 text-[15px] rounded-[5px] text-black ${className}`}
        onChange={(e) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        onBlur={handleCheckRules}
      />
      {type == "password" && (
        <span
          className="absolute top-1/2 -translate-y-1/2 right-3 text-black transition-all hover:text-primary cursor-pointer"
          onClick={() => {
            setShowPassword(!showPassword);
            setNewType(showPassword ? "password" : "text");
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
      {message && (
        <p className="text-error mt-[2px] absolute text-[12px]">{message}</p>
      )}
    </div>
  );
}

export default Input;
