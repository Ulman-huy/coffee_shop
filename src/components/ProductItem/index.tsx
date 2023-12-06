import { ProductType } from "../../types";
// import { IoHeartSharp } from "react-icons/io5";
import { Button } from "antd";
import { IoHeartOutline, IoEyeSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { renderStar } from "../../utils";

type Props = {
  product: ProductType;
  setProductPreview?: (product: ProductType) => void;
  setVisible?: (visible: boolean) => void;
  preview: boolean;
};

function ProductItem({
  preview,
  product,
  setVisible,
  setProductPreview,
}: Props) {
  return (
    <div className="w-full block h-full p-5 bg-black rounded-xl cursor-pointer group relative">
      {preview && (
        <Button
          onClick={() => {
            if (setProductPreview) {
              setProductPreview(product);
            }
            if (setVisible) {
              setVisible(true);
            }
          }}
          className="absolute z-10 h-[40px] text-[20px] top-10 right-5 opacity-0 translate-x-4 group-hover:translate-x-0 transition-transform duration-300 group-hover:opacity-100 text-yellow border-yellow bg-[#ddd] w-[40px] flex items-center justify-center"
        >
          <span>
            <IoEyeSharp />
          </span>
        </Button>
      )}
      <Link
        to={`/products/${product._id}/${product.slug}`}
        className="w-full block rounded-xl overflow-hidden aspect-square"
      >
        <img
          src={product.images.split(",")[0]}
          className="hover:scale-105 transition-transform duration-300 w-full h-full object-cover"
          alt=""
        />
      </Link>
      <Link to={`/products/${product._id}/${product.slug}`}>
        <h4 className="mt-2 line-clamp-2 leading-[20px]">{product.name}</h4>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <span>{renderStar(product.star)}</span>
        <span className="text-[14px]">{product.sold} đã bán</span>
      </div>
      <h4>
        {product.sale != 0 && (
          <del className="text-[15px]">
            {Intl.NumberFormat().format(
              product.price + (product.price * product.sale) / 100
            )}{" "}
            ₫
          </del>
        )}
        <span className="text-[20px] ms-2 text-primary font-semibold">
          {Intl.NumberFormat().format(product.price)} ₫
        </span>
      </h4>
      <div className="flex justify-between gap-4 mt-2">
        <Button className="w-[44px] h-[40px] text-yellow text-[22px] flex justify-center items-center">
          <span>
            <IoHeartOutline />
            {/* <IoHeartSharp /> */}
          </span>
        </Button>
        <Button className="w-full h-[40px] flex items-center justify-center text-[22px] text-yellow">
          <FaCartShopping />
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
