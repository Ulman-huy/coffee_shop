import { ProductType } from "../../types";
import { Button } from "antd";
import { IoHeartOutline, IoEyeSharp, IoHeartSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { renderStar } from "../../utils";
import { useState } from "react";
import { POST } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/reducer/cartReducer";
import { toast } from "react-toastify";
import { dislikeProduct, likeProduct } from "../../redux/reducer/userReducer";

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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);

  const handleAddToCart = async () => {
    setLoading(true);
    const options = {
      url: "product/add-product",
      body: {
        _id: product._id,
        type: "PLUS",
        quantity: 1,
      },
    };
    await POST(options)
      .then((response) => {
        if (response.message == "OK") {
          toast.success("Đã thêm sảm phẩm vào giỏ hàng!");
          dispatch(addCart({ product_id: product._id, quantity: 1 }));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLikeProduct = async () => {
    let type = "";

    if (user?.like.includes(product._id)) {
      type = "DISLIKE";
    } else {
      type = "LIKE";
    }

    const options = {
      url: "product/like",
      body: {
        type,
        _id: product._id,
      },
    };
    await POST(options).then((response) => {
      if (response.message == "OK") {
        if (type == "LIKE") {
          dispatch(likeProduct({ _id: product._id }));
          toast.success("Đã thêm sản phẩm vào danh sách yêu thích");
        } else {
          dispatch(dislikeProduct({ _id: product._id }));
          toast.success("Đã bỏ sản phẩm khỏi danh sách yêu thích");
        }
      }
    });
  };
  console.log({ user });

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
        <Button
          onClick={handleLikeProduct}
          className={`w-[44px] h-[40px] text-yellow text-[22px] flex justify-center items-center ${
            user?.like.includes(product._id) && "border-yellow"
          }`}
        >
          <span>
            {user?.like.includes(product._id) ? (
              <IoHeartSharp />
            ) : (
              <IoHeartOutline />
            )}
          </span>
        </Button>
        <Button
          onClick={handleAddToCart}
          className="w-full h-[40px] flex items-center justify-center text-[22px] text-yellow"
          loading={loading}
        >
          <FaCartShopping />
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
