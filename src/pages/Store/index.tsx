import { useState } from "react";
import { banner_store, storeSlide2 } from "../../assets/images";
import { STORE_AREA } from "../../data";
import { Link } from "react-router-dom";
import { slugify } from "../../utils";
import {
  FaBagShopping,
  FaBellConcierge,
  FaSquareParking,
  FaUserGroup,
} from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";

function Store() {
  const [areaViews, setAreaViews] = useState(STORE_AREA[0]);
  const [more, setMore] = useState(4);

  return (
    <>
      <div className="relative flex justify-center items-center select-none pointer-events-none">
        <img
          className="max-h-[180px] w-full object-cover"
          src={banner_store}
          alt="store banner"
        />
        <h3 className="text-[25px] title-store absolute font-bold text-white">
          Hệ thống xx cửa hàng{" "}
          <span className="font-pacifico text-[30px]">coffeeHouse</span> trên
          toàn quốc
        </h3>
      </div>
      <div className="flex justify-center relative">
        <div className="max-w-default w-full flex pt-10">
          <div className="w-[240px] flex-shrink-0">
            <p className="text-lg font-medium">Khu vực</p>
            <div className="ml-4 sticky top-[92px]">
              {STORE_AREA.map((store: any, index: number) => (
                <p
                  key={index}
                  className={`mt-3 text-[15px] font-medium cursor-pointer hover:text-yellow transition-colors duration-300 ${
                    areaViews.area == store.area && "text-yellow"
                  }`}
                  onClick={() => {
                    setAreaViews(store);
                    setMore(4)
                  }}
                >
                  {store.area} ({store.stores.length})
                </p>
              ))}
            </div>
          </div>
          <div className="mb-[60px] pl-[60px] border-l-[3px] border-yellow">
            <h4 className="text-xl">
              Khám phá{" "}
              <span className="text-yellow font-medium">
                {areaViews.stores.length}
              </span>{" "}
              cửa hàng của chúng tôi ở {areaViews.area}
            </h4>
            <div className="grid grid-cols-2">
              {areaViews.stores
                .slice(0, more)
                .map((store: any, index: number) => (
                  <div key={index} className="mx-4 mt-8 ">
                    <Link to={slugify(store.name)}>
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={storeSlide2}
                          alt=""
                          className="w-full hover:scale-105 transition-all duration-300"
                        />
                      </div>
                    </Link>
                    <h4 className="my-[10px] text-lg font-semibold">
                      {store.name}
                    </h4>
                    <button className="mb-3 py-[10px] bg-yellow-10 w-full rounded-lg font-semibold hover:bg-yellow transition-all duration-300 hover:text-white text-yellow">
                      Xem bản đồ
                    </button>
                    <div className="border-t border-t-yellow">
                      <p className="text-[14px] pt-3">{store.location}</p>
                    </div>
                    <p className="my-2 text-[14px] font-bold flex items-center gap-1 leading-normal">
                      <MdAccessTime /> {store.time}
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {store.isCar && (
                        <div className="text-[14px] flex gap-1 items-center">
                          <FaSquareParking />
                          <p className="m-0">Có chỗ đỗ xe hơi</p>
                        </div>
                      )}
                      {store.isFriendly && (
                        <div className="text-[14px] flex gap-1 items-center">
                          <FaUserGroup />
                          <p className="m-0">Thân thiện với gia đình</p>
                        </div>
                      )}
                      {store.isServe && (
                        <div className="text-[14px] flex gap-1 items-center">
                          <FaBellConcierge />
                          <p className="m-0">Phục vụ tại chỗ</p>
                        </div>
                      )}
                      {store.isCarried && (
                        <div className="text-[14px] flex gap-1 items-center">
                          <FaBagShopping />
                          <p className="m-0">Mua mang đi</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="py-2 px-6 border-[1px] border-grey"
                onClick={() => setMore((prev) => (prev += 4))}
              >
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
