import { Link } from "react-router-dom";
import {
  bg1,
  chat,
  coffee,
  dishes,
  product_store,
  tea,
} from "../../../assets/images";

function Category() {
  return (
    <div
      className="flex justify-center min-h-screen items-center bg-no-repeat bg-contain bg-grey bg-center"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <div className="max-w-default w-full grid grid-cols-4 gap-[30px] h-[550px]">
        <div className="col-span-2 row-span-2 flex items-center justify-center relative rounded-lg overflow-hidden ease-linear group">
          <img
            className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-500 blur-[5px] hover:blur-0"
            src={coffee}
            alt=""
          />
          <Link
            to="/product"
            className="py-4 px-6 border-[3px] border-yellow font-semibold group-hover:bg-yellow uppercase absolute"
          >
            Coffee Tự nhiên
          </Link>
        </div>
        <div className="flex items-center justify-center relative rounded-lg overflow-hidden ease-linear group">
          <img
            className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-500 blur-[5px] hover:blur-0"
            src={dishes}
            alt=""
          />
          <Link
            to="/product"
            className="py-4 px-6 border-[3px] border-yellow font-semibold group-hover:bg-yellow uppercase absolute"
          >
            Món ăn
          </Link>
        </div>
        <div className="flex items-center justify-center relative rounded-lg overflow-hidden ease-linear group">
          <img
            className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-500 blur-[5px] hover:blur-0"
            src={tea}
            alt=""
          />
          <Link
            to="/product"
            className="py-4 px-6 border-[3px] border-yellow font-semibold group-hover:bg-yellow uppercase absolute"
          >
            Tea
          </Link>
        </div>
        <div className="flex items-center justify-center relative rounded-lg hover:grayscale-0 group overflow-hidden ease-linear duration-500 ">
          <img
            className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-500 blur-[5px] hover:blur-0"
            src={product_store}
            alt=""
          />
          <Link
            to="/store"
            className="py-4 px-6 border-[3px] border-yellow font-semibold group-hover:bg-yellow uppercase absolute"
          >
            Cửa hàng
          </Link>
        </div>
        <div className="flex items-center justify-center relative rounded-lg overflow-hidden ease-linear group">
          <img
            className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-500 blur-[5px] hover:blur-0"
            src={chat}
            alt=""
          />
          <Link
            to="/discover"
            className="py-4 px-6 border-[3px] border-yellow font-semibold group-hover:bg-yellow uppercase absolute"
          >
            Chuyện nhà
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Category;
