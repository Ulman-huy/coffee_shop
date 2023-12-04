import { Link, NavLink } from "react-router-dom";
import {
  FaHeart,
  FaMoon,
  FaQuestion,
  FaShoppingCart,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { FaArrowRightToBracket, FaTruckFast } from "react-icons/fa6";
import { useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import { cart_empty } from "../../../assets/images";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../../main";

const navbar = [
  {
    title: "Trang chủ",
    to: "/",
  },
  {
    title: "Sản phẩm",
    to: "/products",
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
const userTools = [
  {
    title: "Đơn hàng",
    icon: <FaTruckFast />,
    to: "/package",
  },
  {
    title: "Chế độ tối",
    icon: <FaMoon />,
  },
  {
    title: "Phản hồi & Góp ý",
    icon: <FaQuestion />,
    to: "/feedback",
  },
];

function Header() {
  const user = useSelector((state: any) => state.user.data);
  const [active, setActive] = useState("/");
  const { ref, show, setShow } = useOutsideClick();
  const {
    ref: cartRef,
    show: showCart,
    setShow: setShowCart,
  } = useOutsideClick();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    signOut(auth);
    toast.success("Đã đăng xuất tài khoản!");
  };

  return (
    <header className="z-[99999] fixed top-0 h-[80px] w-full flex justify-center bg-header">
      <div className="max-w-default w-full flex justify-between items-center">
        <div className="font-pacifico text-[30px] cursor-pointer">
          <Link to="/" className="m-0 py-3 text-white">
            coffeeHouse
          </Link>
        </div>
        <nav className="flex">
          {navbar.map((nav, index) => (
            <NavLink
              key={index}
              className={`px-4 py-2 text-lg font-semibold hover:text-primary transition-all ${
                active == nav.to ? "text-primary nav-active" : "text-white"
              }`}
              to={nav.to}
              onClick={() => setActive(nav.to)}
            >
              {nav.title}
            </NavLink>
          ))}
        </nav>
        <div className="flex">
          <Link
            to="/user/wishlist"
            className="hover:text-primary transition-colors relative text-[20px] flex w-[34px] h-[34px] self-center items-center text-white ml-4 cursor-pointer"
            title="Sản phẩm yêu thích"
          >
            <FaHeart />
          </Link>
          <div className="relative" ref={cartRef}>
            <Link
              to="/cart"
              onMouseEnter={() => setShowCart(true)}
              className="transition-colors relative text-[20px] flex w-[34px] h-[34px] self-center items-center text-white ml-4 cursor-pointer"
            >
              <FaShoppingCart />
            </Link>
            {showCart && (
              <div className="bg-white py-4 rounded-[5px] absolute top-[50px] min-w-[365px] right-0">
                <div className="">
                  {user && !user.cart.length && (
                    <div className="flex flex-col items-center">
                      <img
                        src={cart_empty}
                        alt=""
                        className="w-[80px] h-[80px]"
                      />
                      <p className="text-black mt-3 text-[15px] font-semibold">
                        Chưa có sản phẩm
                      </p>
                    </div>
                  )}
                  {/* {!isEmpty &&
                  cart.map((item, index) => (
                    <CartItem key={index} data={item} />
                  ))} */}
                </div>
                {/* {!isEmpty ? (
                <div className={cx("cart-footer")}>
                  <p className={cx("count-item")}>
                    {cart.length} sản phẩm trong giỏ hàng
                  </p>
                  <Link to="/cart" className={cx("button")}>
                    Xem giỏ hàng
                  </Link>
                </div>
              ) : (
                ""
              )} */}
              </div>
            )}
          </div>
          <div
            ref={ref}
            className="transition-colors relative text-[20px] flex w-[34px] h-[34px] self-center items-center text-white ml-4 cursor-pointer"
          >
            <span className="hover:text-primary" onClick={() => setShow(true)}>
              {user && user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="rounded-full object-cover"
                />
              ) : (
                <FaUser />
              )}
            </span>
            {show && (
              <div className="absolute bg-white top-[50px] min-w-[180px] right-0 rounded-md overflow-hidden">
                {user ? (
                  <>
                    <Link
                      to="/info"
                      className="block text-center text-primary text-base py-2 font-semibold border-b-[2px] border-[#ddd] hover:bg-[#ddd] transition-colors duration-300"
                    >
                      {user.username}
                    </Link>
                    {userTools.map((item: any) => (
                      <Link
                        to={item.to}
                        key={item.to}
                        className="flex items-center gap-2 text-black font-medium p-2 hover:bg-[#ddd] transition-colors"
                      >
                        <span className="w-[20px] h-[20px]">{item.icon}</span>
                        <span className="text-base whitespace-nowrap">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                    <div
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-black font-medium p-2 hover:bg-[#ddd] transition-colors border-t-[2px] border-[#ddd]"
                    >
                      <span className="w-[20px] h-[20px]">
                        <MdOutlineLogout />
                      </span>
                      <span className="text-base">Đăng xuất</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/sigup"
                      className="flex items-center gap-2 text-black font-medium p-2 hover:bg-[#ddd] transition-colors"
                    >
                      <FaUserCircle />
                      <span className="text-base">Đăng ký</span>
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center gap-2 text-black font-medium p-2 hover:bg-[#ddd] transition-colors"
                    >
                      <FaArrowRightToBracket />
                      <span className="text-base">Đăng nhập</span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          {user && user.role == "ADMIN" && (
            <Link to="/admin">
              <div className="transition-colors relative text-[20px] flex w-[34px] h-[34px] self-center items-center text-white ml-4 cursor-pointer">
                <MdDashboard />
              </div>
            </Link>
          )}
        </div>
        {/* <div className="fixed z-[9999] bg-black border-l border-primary w-[80%] shadow-md translate-x-[100%] opacity-0 transition-all">
          {navbar.map((nav, index) => (
            <NavLink key={index} to={nav.to}>
              {nav.title}
            </NavLink>
          ))}
        </div> */}
      </div>
    </header>
  );
}

export default Header;
