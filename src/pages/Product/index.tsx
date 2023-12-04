import { useEffect, useMemo, useState, useContext } from "react";
import Slider from "./components/Slider";
import { RiSearch2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { renderStar } from "../../utils";
import { product_empty } from "../../assets/images";
import { BRAND_LIST } from "../../data";
import { ProductType } from "../../types";
import { GET } from "../../service";
import ProductItem from "../../components/ProductItem";
import { GlobalContext } from "../../context";
import Pagination from "../../components/Pagination";
import { IoReload } from "react-icons/io5";
import useDebounce from "../../hooks/useDebounce";

const keys: any = {
  min: "Giá nhỏ nhất: ",
  max: "Giá lớn nhất: ",
  type: "Loại: ",
  brand: "Thương hiệu: ",
  star: "Đánh giá: ",
};

function Product() {
  const { setLoading, setProductPreview, setIsPreview }: any =
    useContext(GlobalContext);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5000000);
  const [more, setMore] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [searchValues, setSearchValues] = useState<any>({});
  const [inputSearch, setInputSearch] = useState("");

  const searchDebounce = useDebounce(inputSearch, 500);

  const styleProcess = useMemo(() => {
    return {
      right: `${100 - maxValue / 50000}%`,
      left: `${minValue / 50000}%`,
    };
  }, [maxValue, minValue]);

  const handleChagnePrice = (e: any, setValue: any, condition: boolean) => {
    const value = Number(e.target.value);
    if (condition) return;
    setValue(value);
  };

  const getAllProducts = async () => {
    setLoading(true);
    const options: any = {
      url: "product/all",
      params: {
        limit: 9,
        page: page,
      },
    };
    if (Object.keys(searchValues).length) {
      options.params = { ...options.params, ...searchValues };
    }
    if (inputSearch) {
      options.params = { ...options.params, name: inputSearch };
    }
    await GET(options)
      .then((response) => {
        if (response) {
          setProducts(response.data);
          setTotalPage(response.totalPage);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [page, searchValues, searchDebounce]);

  return (
    <>
      <Slider />
      <div className="bg-black flex py-8 flex-col items-center">
        <div className="max-w-[50%] w-full h-[40px] relative">
          <input
            style={{ border: "1px solid var(--text-grey-color)" }}
            className="w-full h-full rounded-full bg-grey text-yellow text-[15px] pr-11 focus:shadow-search focus:border-yellow"
            placeholder="Nhập sản phẩm cần tìm"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <span className="absolute top-1/2 -translate-y-1/2 right-3 text-[22px] hover:text-yellow transition-colors cursor-pointer">
            <RiSearch2Line />
          </span>
        </div>
      </div>
      <div className="bg-grey pt-8 flex justify-center">
        <div className="max-w-default pb-10 w-full flex gap-6">
          <div className="max-w-[280px] w-full">
            <div className="bg-black p-4 rounded-md">
              <h3 className="font-medium text-lg uppercase mb-1">Danh mục</h3>
              <ul>
                <li
                  className="hover:text-yellow transition-colors cursor-pointer py-1 ml-3 font-medium"
                  onClick={() =>
                    setSearchValues((prev: any) => {
                      return { ...prev, type: "COFFEE" };
                    })
                  }
                >
                  Coffee
                </li>
                <li
                  className="hover:text-yellow transition-colors cursor-pointer py-1 ml-3 font-medium"
                  onClick={() =>
                    setSearchValues((prev: any) => {
                      return { ...prev, type: "TEA" };
                    })
                  }
                >
                  Món ăn
                </li>
                <li
                  className="hover:text-yellow transition-colors cursor-pointer py-1 ml-3 font-medium"
                  onClick={() =>
                    setSearchValues((prev: any) => {
                      return { ...prev, type: "DISHED" };
                    })
                  }
                >
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
                    max={5000000}
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
                    max={5000000}
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
                  onClick={() =>
                    setSearchValues((prev: any) => {
                      return { ...prev, max: maxValue, min: minValue };
                    })
                  }
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
                      onClick={() =>
                        setSearchValues((prev: any) => {
                          return { ...prev, brand: brand };
                        })
                      }
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pb-4">
                <h4 className="uppercase pt-4">Đánh giá</h4>
                <div className="ml-3">
                  <div
                    onClick={() =>
                      setSearchValues((prev: any) => {
                        return { ...prev, star: 5 };
                      })
                    }
                  >
                    {renderStar(5)}
                  </div>
                  <div
                    onClick={() =>
                      setSearchValues((prev: any) => {
                        return { ...prev, star: 4 };
                      })
                    }
                  >
                    {renderStar(4)}
                  </div>
                  <div
                    onClick={() =>
                      setSearchValues((prev: any) => {
                        return { ...prev, star: 3 };
                      })
                    }
                  >
                    {renderStar(3)}
                  </div>
                  <div
                    onClick={() =>
                      setSearchValues((prev: any) => {
                        return { ...prev, star: 2 };
                      })
                    }
                  >
                    {renderStar(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            {!!products.length ? (
              <>
                {!!Object.keys(searchValues).length && (
                  <div className="flex gap-2 mb-2">
                    {Object.keys(searchValues).map((key, i) => (
                      <div
                        className="px-2 py-1 border border-yellow text-yellow flex items-center"
                        key={i}
                      >
                        <span className="input-label">
                          {keys[key]}
                          {searchValues[key]}
                        </span>
                      </div>
                    ))}
                    <div
                      className="px-2 py-1 border border-yellow text-yellow flex items-center gap-2 cursor-pointer"
                      onClick={() => setSearchValues({})}
                    >
                      <span className="input-label">reset</span>
                      <span>
                        <IoReload />
                      </span>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-3">
                  {products.map((product: ProductType) => (
                    <ProductItem
                      setVisible={setIsPreview}
                      setProductPreview={setProductPreview}
                      key={product._id}
                      product={product}
                      preview
                    />
                  ))}
                </div>
                <div className="mt-5 flex justify-end">
                  <Pagination
                    totalPage={totalPage}
                    page={page}
                    setPage={setPage}
                    elementPerPage={9}
                  />
                </div>
              </>
            ) : (
              <div className="flex justify-center w-full mt-16">
                <div className="flex flex-col items-center">
                  <img className="w-[350px]" src={product_empty} alt="" />
                  <h3>Không tìm thấy sản phẩm !</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
