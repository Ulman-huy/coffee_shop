import { Link, Outlet } from "react-router-dom";
import SliderAuth from "../components/SliderAuth";
import { bg2 } from "../../assets/images";

function HeaderOnly() {
  return (
    <>
      <div className="w-full h-[84px] flex justify-center">
        <div className="max-w-default w-full flex justify-between items-center">
          <Link
            to="/"
            className="font-pacifico font-medium text-[34px] text-white"
          >
            coffeeHouse
          </Link>
          <Link to="/help-center" className="text-primary text-[15px]">
            Bạn cần giúp đỡ?
          </Link>
        </div>
      </div>
      <div
        className="flex justify-center w-full"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div
          className="flex justify-around max-w-default w-full items-center"
          style={{ height: "calc(100vh - 84px)" }}
        >
          <div className="w-[40%] h-[75%] mt-20 select-none">
            <SliderAuth />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default HeaderOnly;
