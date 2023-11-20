import { useMemo, useState } from "react";
import Slider from "./components/Slider";
import { RiSearch2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { renderStar } from "../../utils";
import { product_empty } from "../../assets/images";

const BRAND_LIST = [
  "Starbucks",
  "HighLands",
  "Gờ Coffee",
  "Cheese Coffee",
  "Phúc Long",
  "VinaCafe",
  "NesCafe",
  "Ông Bầu",
  "Chuk Chuk",
  "Laha Coffee",
  "Katinat Coffee",
  "Trung Nguyên",
  "Trà Atiso",
  "Trà Thái Nguyên",
  "Trà sữa Koi Thé",
  "Trà Olong Trà Ý",
  "Trà Sen Việt",
  "Trà Vạn Lộc",
  "Trà Thượng Hạng",
  "Trà Thanh Tâm",
  "Trà Hoa Viên",
  "Trà Việt Nam",
  "Kinh Đô",
  "Bibica",
  "Phước Lộc Thọ",
  "ABC Bakery",
  "Bánh Đa Lợn Huế",
  "Thăng Long",
  "Hải Hà",
  "Đức Phát",
  "Anh Đào",
  "Kẹo Mèo",
];

function Product() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000000);
  const [more, setMore] = useState(false);

  const styleProcess = useMemo(() => {
    return {
      right: `${100 - maxValue / 10000}%`,
      left: `${minValue / 10000}%`,
    };
  }, [maxValue, minValue]);

  const handleChagnePrice = (e: any, setValue: any, condition: boolean) => {
    const value = Number(e.target.value);
    if (condition) return;
    setValue(value);
  };

  return (
    <>
      <Slider />
      <div className="bg-black flex py-8 flex-col items-center">
        <div className="max-w-[50%] w-full h-[40px] relative">
          <input
            style={{ border: "1px solid var(--text-grey-color)" }}
            className="w-full h-full rounded-full bg-grey text-yellow text-[15px] pr-11 focus:shadow-search focus:border-yellow"
            placeholder="Nhập sản phẩm cần tìm"
          />
          <span className="absolute top-1/2 -translate-y-1/2 right-3 text-[22px] hover:text-yellow transition-colors cursor-pointer">
            <RiSearch2Line />
          </span>
        </div>
      </div>
      <div className="bg-grey pt-8 flex justify-center">
        <div className="max-w-default pb-10 w-full flex gap-6">
          <div className="max-w-[300px] w-full">
            <div className="bg-black p-4 rounded-md">
              <h3 className="font-medium text-lg uppercase mb-1">Danh mục</h3>
              <ul>
                <li className="hover:text-yellow transition-colors cursor-pointer py-1 ml-3 font-medium">
                  Coffee
                </li>
                <li className="hover:text-yellow transition-colors cursor-pointer py-1 ml-3 font-medium">
                  Món ăn
                </li>
                <li className="hover:text-yellow transition-colors cursor-pointer py-1 ml-3 font-medium">
                  Trà
                </li>
              </ul>
            </div>
            <div className="mt-5 bg-black p-4 rounded-md">
              <h3 className="font-medium text-lg uppercase mb-1 text-center">
                Bộ lọc
              </h3>
              <div className="pb-6 border-b border-b-grey">
                <div className="relative flex w-full h-1 rounded-full mt-6 bg-grey">
                  <div
                    className="bg-yellow h-1 absolute process"
                    style={styleProcess}
                  ></div>
                  <input
                    className="range-custom"
                    type="range"
                    value={minValue}
                    min={0}
                    max={1000000}
                    step={10000}
                    onChange={(e: any) =>
                      handleChagnePrice(
                        e,
                        setMinValue,
                        maxValue <= Number(e.target.value)
                      )
                    }
                  />
                  <input
                    className="range-custom"
                    type="range"
                    value={maxValue}
                    min={0}
                    max={1000000}
                    step={10000}
                    onChange={(e: any) =>
                      handleChagnePrice(
                        e,
                        setMaxValue,
                        minValue >= Number(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="mt-6 flex justify-between text-[15px] text-grey items-center font-medium">
                  <span>{minValue}₫</span>
                  <span>-</span>
                  <span>{maxValue}₫</span>
                </div>
                <button
                  className="w-full bg-yellow rounded-[5px] font-semibold text-[15px] py-2 mt-4"
                  // onClick={handleFindWithPrice}
                >
                  Áp dụng
                </button>
              </div>
              <div className="border-b border-grey pb-4">
                <div
                  className="uppercase flex justify-between pt-4 items-center cursor-pointer"
                  onClick={() => setMore(!more)}
                >
                  <span>Nhãn hiệu</span>
                  <FaAngleDown />
                </div>
                <ul
                  className="ml-5 overflow-hidden transition-all duration-300"
                  style={
                    more
                      ? { height: `${BRAND_LIST.length * 26.5}px` }
                      : { height: 0 }
                  }
                >
                  {BRAND_LIST.map((brand, index) => (
                    <li
                      key={index}
                      className="text-grey hover:text-yellow transition-all duration-300 font-semibold text-[15px] cursor-pointer mt-1 hover:translate-x-1"
                      // onClick={() => handleGetProductWithBrand(brand)}
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pb-4">
                <h4 className="uppercase pt-4">Đánh giá</h4>
                <div className="ml-3">
                  <div>{renderStar(5)}</div>
                  <div>{renderStar(4)}</div>
                  <div>{renderStar(3)}</div>
                  <div>{renderStar(2)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-center w-full mt-16">
              <div className="flex flex-col items-center">
                <img className="w-[350px]" src={product_empty} alt="" />
                <h3>Không tìm thấy sản phẩm !</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
