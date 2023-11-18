import { Link } from "react-router-dom";
import { bg2 } from "../../../assets/images";
import { useState } from "react";

const tabs = ["Tất cả", "Coffee", "Trà", "Món ăn"];

function ProductSuggest() {
  const [tabActive, setTabActive] = useState("Tất cả");
  return (
    <div
      className="flex justify-center items-center bg-no-repeat bg-contain bg-grey bg-center"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      <div className="max-w-default  min-h-screen w-full flex flex-col justify-around">
        <div className="flex justify-between">
          <h2 className="text-yellow font-pacifico text-[36px] uppercase m-0">
            Sản phẩm bán chạy
          </h2>
          <div className="flex gap-2">
            {tabs.map((tab: string) => (
              <p
                key={tab}
                onClick={() => setTabActive(tab)}
                className={`font-semibold hover:text-yellow hover:underline transition-colors cursor-pointer ${
                  tab == tabActive ? "text-yellow underline" : ""
                }`}
              >
                {tab}
              </p>
            ))}
          </div>
        </div>
        <div className="h-[450px] gird grid-cols-4">
                {/* Product Item */}
        </div>
        <div className="flex justify-center">
          <Link
            to=""
            className="font-semibold hover:underline hover:text-yellow text-[14px] transition-colors"
          >
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductSuggest;
