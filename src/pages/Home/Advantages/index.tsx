import { Link } from "react-router-dom";
import {
  cash_back,
  fast_box,
  free_money,
  natural,
} from "../../../assets/images";

const advantages = [
  {
    title: "100% Tự nhiên",
    description:
      "Thưởng thức hương vị tuyệt đỉnh của thiên nhiên, với sản phẩm 100% Tự nhiên của chúng tôi!",
    iconImage: natural,
  },
  {
    title: "Vận chuyển miễn phí",
    description:
      "Nhận ngay vận chuyển miễn phí, đón nhận ngay sự tiện lợi và hài lòng!",
    iconImage: fast_box,
  },
  {
    title: "Giao hàng nhanh chóng",
    description:
      "Đến tay khách hàng, chỉ trong nháy mắt với dịch vụ giao hàng nhanh chóng của chúng tôi!",
    iconImage: free_money,
  },
  {
    title: "Hoàn tiền",
    description:
      "Chúng tôi cam kết hoàn tiền nếu bạn không hài lòng với sản phẩm và dịch vụ của chúng tôi!",
    iconImage: cash_back,
  },
];

function Advantages() {
  return (
    <div className="flex justify-center items-center">
      <div className="min-h-[640px] max-w-default w-full flex flex-col justify-around h-full">
        <h2
          className="text-center text-[36px] uppercase font-pacifico m-0 text-yellow"
          style={{ wordSpacing: "8px" }}
        >
          Tiện lợi
        </h2>
        <div className="flex justify-between">
          {advantages.map((item: any, index: number) => (
            <Link
              to=""
              className="p-[10px] px-5 flex flex-col items-center"
              key={index}
            >
              <img
                className="w-[61px] h-[61px] mb-[25px] object-contain transition-transform hover:scale-95"
                src={item.iconImage}
                alt=""
              />
              <div className="text-[17px] font-semibold mb-2">{item.title}</div>
              <div className="text-[14px] text-center">{item.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Advantages;
