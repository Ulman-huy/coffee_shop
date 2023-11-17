import { Link, NavLink } from "react-router-dom";
import {
  FaHeart,
  FaMoon,
  FaQuestion,
  FaShoppingCart,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { FaArrowRightToBracket, FaGear, FaTruckFast } from "react-icons/fa6";
// import CartItem from '../../../components/CartItem';
import { useRef, useState } from "react";
// import { cart_empty } from "@/assets/images";
import useOutsideClick from "../../../hooks/useOutsideClick";

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
    title: "Cài đặt",
    icon: <FaGear />,
    to: "/settings",
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
  const [active, setActive] = useState("/");
  const { ref, show, setShow } = useOutsideClick();
  // const cartRef = useRef(null);
  // const [showNavbar, setShowNavbar] = useState(false);

  const handleLogout = () => {};

  // const renderUser = () => (
  //   <div className={cx("user-container")}>
  //     {user.isLogin && (
  //       <div className={cx("username", "line")}>
  //         <Link to="/user">{user.username}</Link>
  //       </div>
  //     )}
  //     <div className={cx("user-tools")}>
  //       {userTools.map((tool, index) => {
  //         let Comp = "div";
  //         const props = {};
  //         if (tool.to) {
  //           props.to = tool.to;
  //           Comp = Link;
  //         }
  //         return (
  //           <Comp key={index} className={cx("tool-item")} {...props}>
  //             <span className={cx("tool-icon")}>
  //               <FontAwesomeIcon icon={tool.icon} />
  //             </span>
  //             <span className={cx("tool-title")}>{tool.title}</span>
  //           </Comp>
  //         );
  //       })}
  //     </div>
  //     <div
  //       onClick={() => handleLogout(user.isLogin)}
  //       className={cx("logout", "line")}
  //     >
  //       <div className={cx("icon")}>
  //         <FontAwesomeIcon icon={faArrowRightToBracket} />
  //       </div>
  //       <span className={cx("text")}>
  //         {user.isLogin ? "Đăng xuất" : "Đăng nhập"}
  //       </span>
  //     </div>
  //   </div>
  // );

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
          <div>
            <Link
              to="/cart"
              className="hover:text-primary transition-colors relative text-[20px] flex w-[34px] h-[34px] self-center items-center text-white ml-4 cursor-pointer"
            >
              <FaShoppingCart />
            </Link>
            {/* <div className={cx("cart-container")}>
              <div ref={cartRef} className={cx("carts")}>
                {isEmpty && (
                  <div className={cx("cart-empty")}>
                    <img src={cart_empty} alt="" width={80} />
                    <p>Chưa có sản phẩm</p>
                  </div>
                )}
                {!isEmpty &&
                  cart.map((item, index) => (
                    <CartItem key={index} data={item} />
                  ))}
              </div>
              {!isEmpty ? (
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
              )}
            </div> */}
          </div>
          <div
            ref={ref}
            className="group transition-colors relative text-[20px] flex w-[34px] h-[34px] self-center items-center text-white ml-4 cursor-pointer"
          >
            <span className="hover:text-primary" onClick={() => setShow(true)}>
              <FaUser />
            </span>
            {show && (
              <div className="absolute bg-[#eee] top-[50px] min-w-[150px] right-0 rounded-md overflow-hidden">
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
              </div>
            )}
          </div>
          {/* <div className="w-[34px] h-[34px] text-[20px] flex justify-center items-center"> */}
          {/* <FontAwesomeIcon icon={faBars} /> */}
          {/* </div> */}
        </div>
        {/* <div
          className={cx("overlay", { show: showNavbar })}
          onClick={() => setShowNavbar(false)}
        ></div> */}
        <div
          //  className={cx("nav-mb", { show: showNavbar })}
          className="fixed z-[9999] bg-black border-l border-primary w-[80%] shadow-md translate-x-[100%] opacity-0 transition-all"
        >
          {/* <div className={cx("nav-mb-user")}>
            <div className={cx("avatar")}> */}
          {/* <FontAwesomeIcon icon={faUser} /> */}
          {/* </div>
            <div className={cx("register")}>
              <Link to="/sigup">Đăng ký</Link>
              <span>|</span>
              <Link className={cx("login-mb")} to="/login">
                Đăng nhập
              </Link>
            </div>
          </div> */}
          {navbar.map((nav, index) => (
            <NavLink
              key={index}
              // className={(nav) => cx("nav-mb-item", { active: nav.isActive })}
              to={nav.to}
            >
              {nav.title}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
