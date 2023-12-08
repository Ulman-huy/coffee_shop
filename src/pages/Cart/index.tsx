import { useDispatch, useSelector } from "react-redux";
import { GET, POST } from "../../service";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import { CartType } from "../../types";
import { Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { initCart } from "../../redux/reducer/cartReducer";

function Cart() {
  const cart = useSelector((state: any) => state.cart.cart);
  const [carts, setCarts] = useState<CartType[]>([]);
  const { setLoading }: any = useContext(GlobalContext);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();

  const getProductCarts = async () => {
    const options = {
      url: "product/cart",
    };
    setLoading(true);
    await GET(options)
      .then((response) => {
        if (response) {
          setCarts(response);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductCarts();
  }, []);

  const handleChangeQuantity = async (_id: string, type: string) => {
    const options = {
      url: "product/add-product",
      body: {
        quantity: 1,
        _id,
        type,
      },
    };
    await POST(options).then((response) => {
      if (response.message == "OK") {
        const newCartStore = cart
          .map((item: CartType) => {
            if (type == "MINUS" && item._id === _id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            if (type == "PLUS" && item._id === _id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          })
          .filter((item: CartType) => item.quantity > 0);
        const newCart = carts
          .map((item: CartType) => {
            if (type == "MINUS" && item._id === _id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            if (type == "PLUS" && item._id === _id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          })
          .filter((item: CartType) => item.quantity > 0);
        dispatch(initCart(newCartStore));
        setCarts(newCart);
        console.log({ newCart });
      }
    });
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="flex gap-8 max-w-default w-full items-start">
        <div className="rounded-lg flex-1">
          <h3 className="text-[22px] font-semibold">
            Giỏ hàng (<span className="text-yellow">{cart.length}</span>)
          </h3>
          <div className="mt-4 bg-grey p-4 rounded-lg">
            <table className="">
              <tr className="h-[50px]">
                <th className="w-[50px]">STT</th>
                <th className="whitespace-nowrap">Ảnh sản phẩm</th>
                <th>Tên</th>
                <th className="whitespace-nowrap">Số lượng</th>
                <th>Giá</th>
                <th>Tổng tiền</th>
                <th></th>
              </tr>
              <tbody>
                {carts.map((item: CartType, index: number) => (
                  <tr
                    key={item._id}
                    className="h-[80px] border-t border-t-[#ddd]"
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <div className="flex justify-center">
                        <img
                          className="w-[60px] aspect-square object-cover"
                          src={item.images.split(",")[0]}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="max-w-[300px]">
                      <Tooltip title={item.name}>
                        <p className="line-clamp-2">{item.name}</p>
                      </Tooltip>
                    </td>
                    <td className="flex-1">
                      <div className="flex gap-2 items-center px-3">
                        <span
                          onClick={() =>
                            handleChangeQuantity(item._id, "MINUS")
                          }
                          className="flex w-[24px] h-[24px] text-white items-center justify-center cursor-pointer rounded-sm bg-yellow"
                        >
                          <HiOutlineMinusSmall />
                        </span>
                        <span className="text-[15px] w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <span
                          onClick={() => handleChangeQuantity(item._id, "PLUS")}
                          className="flex w-[24px] h-[24px] text-white items-center justify-center cursor-pointer rounded-sm bg-yellow"
                        >
                          <BsPlus />
                        </span>
                      </div>
                    </td>
                    <td className="w-[120px] text-center">
                      {Intl.NumberFormat().format(item.price)}
                    </td>
                    <td className="w-[120px] text-center">
                      {Intl.NumberFormat().format(item.quantity * item.price)}
                    </td>
                    <td>
                      <Tooltip title="Xóa sản phẩm">
                        <span className="cursor-pointer">
                          <MdDelete />
                        </span>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-grey p-6 rounded-lg w-[300px]"></div>
      </div>
    </div>
  );
}

export default Cart;
