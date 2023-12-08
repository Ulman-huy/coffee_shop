import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaMoon,
  FaQuestion,
  FaShoppingCart,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { FaArrowRightToBracket, FaTruckFast } from "react-icons/fa6";
import { useState, useEffect } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../../main";
import { initCart } from "../../../redux/reducer/cartReducer";

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
  const cart = useSelector((state: any) => state.cart.cart);
  const user = useSelector((state: any) => state.user.data);
  const [active, setActive] = useState("/");
  const { ref, show, setShow } = useOutsideClick();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    navigate("/");
    signOut(auth);
    toast.success("Đã đăng xuất tài khoản!");
  };

  useEffect(() => {
    if (user) {
      dispatch(initCart(user.cart));
    }
  }, [user]);

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
          {user && (
            <>
              <Link
                to="/user/wishlist"
                className="hover:text-primary transition-colors relative text-[20px] flex w-[34px] h-[34px] self-center items-center text-white ml-4 cursor-pointer"
                title="Sản phẩm yêu thích"
              >
                <FaHeart />
              </Link>
              <Link to="/cart" className="relative">
                <div className="transition-colors relative text-[20px] flex w-[34px] h-[34px] self-center items-center text-white ml-4 cursor-pointer">
                  <FaShoppingCart />
                </div>
                {!!cart.length && (
                  <span className="absolute bg-primary flex items-center text-[14px] font-bold top-0 right-0 justify-center w-[20px] h-[20px] rounded-full ">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          )}
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
      </div>
    </header>
  );
}

export default Header;
