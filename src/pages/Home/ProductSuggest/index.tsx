import { Link } from "react-router-dom";
import { bg2 } from "../../../assets/images";
import { useEffect, useState } from "react";
import { GET } from "../../../service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ProductType } from "../../../types";
import ProductItem from "../../../components/ProductItem";
import ProductPreview from "../../../components/ProductPreview";

const tabs = [
  { value: "ALL", title: "Tất cả" },
  { value: "COFFEE", title: "Coffee" },
  { value: "TEA", title: "Tea" },
  { value: "DISHED", title: "Món ăn" },
];

function ProductSuggest() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [tabActive, setTabActive] = useState("ALL");
  const [productPreview, setProductPreview] = useState<ProductType>();
  const [visible, setVisible] = useState(false);

  const getProduct = async () => {
    const options = {
      url: "product/all",
    };
    if (tabActive != "ALL") {
      options.url = options.url + "?type=" + tabActive;
    }
    await GET(options).then((response) => {
      if (response) {
        setProducts(response.data);
      }
    });
  };

  useEffect(() => {
    getProduct();
  }, [tabActive]);

  useEffect(() => {
    if (!visible) {
      setProductPreview(undefined);
    }
  }, [visible]);
  return (
    <div
      className="flex justify-center items-center bg-no-repeat bg-contain bg-grey bg-center"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      <div className="max-w-default  min-h-[90vh] w-full flex flex-col justify-around">
        <div className="flex justify-between">
          <h2 className="text-yellow font-pacifico text-[36px] uppercase m-0">
            Sản phẩm bán chạy
          </h2>
          <div className="flex gap-2">
            {tabs.map((tab: { value: string; title: string }) => (
              <p
                key={tab.value}
                onClick={() => setTabActive(tab.value)}
                className={`font-semibold hover:text-yellow hover:underline transition-colors cursor-pointer ${
                  tab.value == tabActive ? "text-yellow underline" : ""
                }`}
              >
                {tab.title}
              </p>
            ))}
          </div>
        </div>
        <div className="h-[450px] gird grid-cols-4">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="h-full"
          >
            {products.map((product: ProductType) => (
              <SwiperSlide>
                <ProductItem
                  preview
                  product={product}
                  setProductPreview={setProductPreview}
                  setVisible={setVisible}
                />
              </SwiperSlide>
            ))}
          </Swiper>
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
      <ProductPreview
        product={productPreview}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
}

export default ProductSuggest;
