import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function NotFound() {
  return (
    <div className="h-screen w-screen bg-grey">
      <div className="h-full w-full flex items-center justify-center flex-col select-none">
        <h1 className="font-pacifico text-primary tracking-[2px] text-[40px] font-medium">
          coffeeHouse
        </h1>
        <p className="text-[30px] my-2 font-bold text-white">
          Không tìm thấy trang (404)
        </p>
        <p className="text-white">Trang bạn đang tìm kiếm không tồn tại!</p>
        <Link to="/" className="text-yellow a-underline mt-2 flex items-center gap-3 p-2">
          <span>quay lại trang chủ</span>
          <span>
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
