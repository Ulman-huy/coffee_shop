import { Link } from "react-router-dom";
import paypal from "@/assets/image/pay/paypal.png";
import amazon from "@/assets/image/pay/amazon.ico";
import mastercard from "@/assets/image/pay/mastercard.png";
import visa from "@/assets/image/pay/visa.webp";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedIcon,
  TwitterIcon,
} from "@/components/Icons";
// import {
//   faPhone,
//   faLocationDot,
//   faEnvelope,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   TwitterIcon,
//   FacebookIcon,
//   InstagramIcon,
//   LinkedIcon,
// } from "../../../components/Icons";
// import { faCopyright } from "@fortawesome/free-regular-svg-icons";

const pages = [
  {
    title: "Trang chủ",
    to: "/",
  },
  {
    title: "Sản phẩm",
    to: "/product",
  },
  {
    title: "Cửa hàng",
    to: "/store",
  },
  {
    title: "Chuyện nhà",
    to: "/discover",
  },
];
const category = [
  {
    title: "Coffee",
    to: "/product/coffee",
  },
  {
    title: "Trà",
    to: "/product/tea",
  },
  {
    title: "Món ăn",
    to: "/product/dishes",
  },
];
function Footer() {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-default w-full">
        <form>
          <div className="h-[180px] bg-black border-b border-grey z-[99999] rounded-t-full w-full mb-0 flex items-center justify-between p-15">
            <label
              htmlFor=""
              className="block flex-shrink-0 text-[38px] break-words font-pacifico"
            >
              Nhận thông tin <span className="text-yellow">mới nhất</span>
            </label>
            <div className="flex w-full">
              <input
                type="email"
                className="flex-1 outline-none h-[52.5px] ml-4 p-4 text-[16px] bg-grey text-yellow border border-[#bbb] transition-all focus:border-yellow focus:shadow-lg placeholder:text-white placeholder:text-[14px]"
                name="email"
                placeholder="Nhập email..."
              />
              <button
                type="submit"
                className="py-[11px] px-[54px] text-lg font-semibold bg-grey text-white border border-[#bbb] border-l-0 hover:shadow-lg shadow-yellow hover:border-yellow hover:border-l-0"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </form>
        <div className="flex justify-between w-full mt-6">
          <div className="pages">
            <h2>Trang</h2>
            <ul>
              {pages.map((page, index) => (
                <li
                  key={index}
                  className="p-2 text-[14px] hover:translate-x-1 font-semibold transition-all"
                >
                  <Link
                    to={page.to}
                    className="text-grey hover:text-primary hover:drop-shadow-md"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="category">
            <h2>Danh mục</h2>
            <ul>
              {category.map((item, index) => (
                <li
                  key={index}
                  className="p-2 text-[14px] hover:translate-x-1 font-semibold transition-all"
                >
                  <Link
                    to={item.to}
                    className="text-grey hover:text-primary hover:drop-shadow-md"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Liên hệ</h2>
            <ul>
              <li className="p-2 text-grey text-[14px] font-semibold">
                {/* <FontAwesomeIcon icon={faPhone} /> */}
                <span>+84 961 144 245</span>
              </li>
              <li className="p-2 text-grey text-[14px] font-semibold">
                {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                <span>aniflex.qi@gmail.com</span>
              </li>
              <li className="p-2 text-grey text-[14px] font-semibold">
                {/* <FontAwesomeIcon icon={faLocationDot} /> */}
                <span>Hoàng Mai, Hà Nội</span>
              </li>
              <li className="p-2 text-grey text-[14px] font-semibold">
                <div className="flex gap-4">
                  <a
                    className="w-5 h-5 text-grey hover:text-primary transition-colors"
                    href="/#"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    className="w-5 h-5 text-grey hover:text-primary transition-colors"
                    href="/#"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    className="w-5 h-5 text-grey hover:text-primary transition-colors"
                    href="/#"
                  >
                    <TwitterIcon />
                  </a>
                  <a
                    className="w-5 h-5 text-grey hover:text-primary transition-colors"
                    href="/#"
                  >
                    <LinkedIcon />
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h2>Thanh toán</h2>
            <ul className="flex flex-wrap w-1/2">
              <li>
                <img
                  className="w-[50px] mx-1 transition-all grayscale hover:grayscale-0"
                  src={paypal}
                  alt=""
                />
              </li>
              <li>
                <img
                  className="w-[50px] mx-1 transition-all grayscale hover:grayscale-0"
                  src={mastercard}
                  alt=""
                />
              </li>
              <li>
                <img
                  className="w-[50px] mx-1 transition-all grayscale hover:grayscale-0"
                  src={amazon}
                  alt=""
                />
              </li>
              <li>
                <img
                  className="w-[50px] mx-1 transition-all grayscale hover:grayscale-0"
                  src={visa}
                  alt=""
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-grey text-center p-3 mt-6 font-semibold">
        {/* <FontAwesomeIcon icon={faCopyright} /> */}
        <span className="ms-[6px]">2023 ulman-huy</span>
      </div>
    </div>
  );
}

export default Footer;
