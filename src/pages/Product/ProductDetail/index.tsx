import { Button, Image } from "antd";
import { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { IoHeartOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { ProductType } from "../../../types";
import { renderStar } from "../../../utils";
import { Link, useParams } from "react-router-dom";
import { GET } from "../../../service";
import { GlobalContext } from "../../../context";

const stars = [
  {
    value: 0,
    title: "Tất cả",
  },
  {
    value: 5,
    title: "5 sao",
  },
  {
    value: 4,
    title: "4 sao",
  },
  {
    value: 3,
    title: "3 sao",
  },
  {
    value: 2,
    title: "2 sao",
  },
  {
    value: 1,
    title: "1 sao",
  },
];

function ProductDetail() {
  const { _id } = useParams();
  const { loading, setLoading }: any = useContext(GlobalContext);
  const [src, setSrc] = useState<string>();
  const [product, setProduct] = useState<ProductType>();
  const [productSuggest, setProductSuggest] = useState<ProductType[]>([]);

  const getProductSuggest = async (type: string) => {
    const options = {
      url: "product/all?type=" + type + "&limit=5",
    };
    await GET(options).then((response) => {
      if (response) {
        const products = response.data.filter(
          (item: ProductType) => item._id != _id
        );
        setProductSuggest(products);
      }
    });
  };

  const getProduct = async () => {
    setLoading(true);
    const options = {
      url: "product/" + _id,
    };
    await GET(options)
      .then(async (response) => {
        if (response) {
          setProduct(response.data);
          setSrc(response.data.images.split(",")[0]);
          await getProductSuggest(response.data.type);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProduct();
  }, [_id]);

  return (
    <div className="flex justify-center min-h-[50vh]">
      {!loading && (
        <div className="max-w-default">
          <div className="flex gap-8 bg-grey p-8 rounded-lg">
            <div className="w-[40%] aspect-square flex-shrink-0">
              <Image.PreviewGroup>
                <Image
                  className="w-full h-full rounded-lg overflow-hidden object-cover"
                  src={src}
                  alt=""
                />
                <div className="flex h-[100px] overflow-auto gap-2 mt-4 scroll__h-5">
                  {product?.images.split(",").map((src: string) => (
                    <Image
                      src={src}
                      key={src}
                      className="rounded-md max-w-[100px] cursor-pointer h-full w-full aspect-square object-cover"
                      onClick={() => setSrc(src)}
                      alt=""
                    />
                  ))}
                </div>
              </Image.PreviewGroup>
            </div>
            <div>
              <h3 className="text-yellow">{product?.brand}</h3>
              <h3 className="text-[26px]">{product?.name}</h3>
              <div className="flex items-center gap-4 mt-4">
                <span>{renderStar(product?.star ?? 0)}</span>
                <span>•</span>
                <span className="relative top-[1px]">
                  {product?.sold} đã bán
                </span>
                {!!product?.like && (
                  <>
                    <span>•</span>
                    <span>{product?.like} lượt thích</span>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {product?.sale != 0 && (
                  <del>
                    {Intl.NumberFormat().format(
                      ((product?.price ?? 0) / (product?.sale ?? 0)) * 100 ?? 0
                    )}{" "}
                    ₫
                  </del>
                )}
                <span className="text-[32px] text-primary font-bold">
                  {Intl.NumberFormat().format(product?.price ?? 0)} ₫
                </span>
              </div>
              <h3 className="mt-5">
                Hạn sử dụng: {dayjs(product?.createdAt).format("DD/MM/YYYY")}
              </h3>
              <div className="mt-2">
                <h3>
                  Công dụng:{" "}
                  <span
                    dangerouslySetInnerHTML={{ __html: product?.info ?? "" }}
                  />
                </h3>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  size="large"
                  className="text-yellow border-yellow text-[28px] flex items-center justify-center w-[44px] flex-shrink-0"
                  icon={<IoHeartOutline />}
                />
                <Button
                  size="large"
                  type="primary"
                  className="w-full bg-yellow flex items-center justify-center"
                  icon={<FaCartShopping />}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-6 items-start">
            <div className="bg-grey p-8 rounded-lg">
              <h2 className="text-[24px] font-semibold mb-2">
                Thông tin chi tiết
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
              />
            </div>
            <div className="rounded-lg bg-grey max-w-[350px] w-full flex-shrink-0 p-6">
              <h3 className="text-lg font-semibold">Sản phẩm liên quan</h3>
              {productSuggest.map((product: ProductType) => (
                <Link
                  to={`/products/${product._id}/${product.slug}`}
                  key={product._id}
                >
                  <div className="mt-3 flex gap-2 group">
                    <img
                      src={product.images.split(",")[0]}
                      className="w-[80px] aspect-square object-cover rounded-md"
                      alt=""
                    />
                    <div>
                      <h4 className="line-clamp-2 leading-[17px] group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <div className="h-[16px] text-[14px]">
                        {renderStar(product.star, 14)}
                      </div>
                      <p className="mt-3 leading-[1]">
                        {Intl.NumberFormat().format(product.price)} ₫
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6 bg-grey p-6 rounded-lg">
            <h2 className="text-[22px] font-semibold mb-2">
              Đánh giá sản phẩm
            </h2>
            <div className="flex gap-3">
              {stars.map((star: { value: number; title: string }) => (
                <Button key={star.value} className="text-yellow border-yellow">
                  {star.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
