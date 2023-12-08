import { useDispatch, useSelector } from "react-redux";
import { DELETE, GET, POST } from "../../service";
import { useContext, useEffect, useState, useMemo } from "react";
import { GlobalContext } from "../../context";
import { CartType } from "../../types";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Tooltip,
} from "antd";
import { MdDelete } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { initCart } from "../../redux/reducer/cartReducer";
import { RiEditFill } from "react-icons/ri";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/reducer/userReducer";
import { toast } from "react-toastify";

function Cart() {
  const cart = useSelector((state: any) => state.cart.cart);
  const user = useSelector((state: any) => state.user.data);
  const [form] = Form.useForm();
  const [carts, setCarts] = useState<CartType[]>([]);
  const { setLoading }: any = useContext(GlobalContext);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);
  const [isAddress, setIsAddress] = useState(false);
  const navigate = useNavigate();
  const province = Form.useWatch("province", form);
  const district = Form.useWatch("district", form);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const totalPrice = useMemo(() => {
    return carts.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.quantity * currentValue.price,
      0
    );
  }, [carts]);

  const handleCreateOrder = async () => {
    if (!type) {
      toast.error("Vui lòng chọn hình thức thanh toán!");
      return;
    }
    if (!user.location) {
      toast.error("Vui lòng thêm địa chỉ nhận hàng!");
      return;
    }
    if (!user.phone) {
      toast.error("Vui lòng thêm số điện thoại!");
      return;
    }
    const data = {
      userId: user._id,
      name: user.username,
      phone: user.phone,
      location: user.location,
      message,
      cart,
    };

    setLoadingOrder(true);
    const options = {
      url: "order/new-package",
      body: data,
    };
    await POST(options)
      .then((response) => {
        if (response.message == "OK") {
          toast.success("Đã đặt đơn hàng thành công!");
          dispatch(initCart([]));
          setCarts([])
        }
      })
      .finally(() => {
        setLoadingOrder(false);
      });
  };

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
          .map((item: any) => {
            if (type == "MINUS" && item.product_id === _id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            if (type == "PLUS" && item.product_id === _id) {
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
      }
    });
  };

  const onRemoveItemCart = async (_id: string) => {
    const options = {
      url: "product/remove-cart/" + _id,
    };

    await DELETE(options).then((response) => {
      if (response.message == "OK") {
        const newCartStore = cart.filter(
          (item: { product_id: string; quantity: number }) =>
            item.product_id != _id
        );
        const newCart = carts.filter((item: CartType) => item._id != _id);
        dispatch(initCart(newCartStore));
        setCarts(newCart);
      }
    });
  };

  const getProvinces = async () => {
    await axios.get("https://provinces.open-api.vn/api/").then((response) => {
      setProvinces(response.data);
    });
  };

  const getDistricts = async () => {
    const code = provinces.find((item: any) => item.name === province).code;
    await axios.get("https://provinces.open-api.vn/api/d/").then((response) => {
      const districts = response.data.filter(
        (item: any) => item.province_code == code
      );
      setDistricts(districts);
    });
  };

  const getWards = async () => {
    const code = districts.find((item: any) => item.name === district).code;
    await axios.get("https://provinces.open-api.vn/api/w/").then((response) => {
      const wards = response.data.filter(
        (item: any) => item.district_code == code
      );
      setWards(wards);
    });
  };

  const onUploadInfo = async (values: any) => {
    const location =
      values.detail +
      ", " +
      values.ward +
      ", " +
      values.district +
      ", " +
      values.province;
    const options = {
      url: "user/update-info",
      body: {
        location,
        phone: values.phone,
      },
    };
    await POST(options)
      .then((response) => {
        if (response.message == "OK") {
          dispatch(setUser(response.data));
          toast.success("Đã cập nhật địa chỉ");
          form.resetFields();
        }
      })
      .finally(() => {
        setIsAddress(false);
      });
  };

  useEffect(() => {
    if (isAddress) {
      getProvinces();
      const location = user?.location.split(",");
      form.setFieldsValue({
        province: location[3].trim(),
        district: location[2].trim(),
        ward: location[1].trim(),
        detail: location[0].trim(),
        phone: user?.phone,
      });
    } else {
      form.resetFields();
    }
  }, [isAddress]);

  useEffect(() => {
    if (province) {
      getDistricts();
    }
  }, [province]);

  useEffect(() => {
    if (district) {
      getWards();
    }
  }, [district]);

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="flex gap-8 max-w-default w-full items-start">
          <div className="rounded-lg flex-1">
            <h3 className="text-[22px] font-semibold">
              Giỏ hàng (<span className="text-yellow">{cart.length}</span>)
            </h3>
            <div className="mt-4 bg-grey p-4 rounded-lg">
              {carts.length ? (
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
                              onClick={() =>
                                handleChangeQuantity(item._id, "PLUS")
                              }
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
                          {Intl.NumberFormat().format(
                            item.quantity * item.price
                          )}
                        </td>
                        <td>
                          <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn muốn xóa sản phẩm này?"
                            okText="Xóa"
                            cancelText="Hủy"
                            onConfirm={() => onRemoveItemCart(item._id)}
                          >
                            <Tooltip title="Xóa sản phẩm">
                              <span className="cursor-pointer">
                                <MdDelete />
                              </span>
                            </Tooltip>
                          </Popconfirm>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center min-h-[220px] justify-center">
                  <p className="text-[24px]">Giỏ hàng trống. Oops!</p>
                  <Button
                    className="bg-yellow mt-2 flex items-center gap-2"
                    size="large"
                    type="primary"
                    onClick={() => navigate("/products")}
                  >
                    <span>Mua ngay</span>
                    <span className="relative top-[2px]">
                      <FaArrowRightLong />
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          {!!carts.length && (
            <div className="bg-grey p-6 rounded-lg w-[300px] mt-[49px]">
              <p className="flex justify-between items-end">
                <span className="text-[15px]">Tổng tiền:</span>
                <span className="text-yellow font-semibold">
                  {Intl.NumberFormat().format(totalPrice)}
                </span>
              </p>
              <p className="flex justify-between items-end mt-2">
                <span className="text-[15px]">Chiết khấu:</span>
                <span className="text-yellow font-semibold">5%</span>
              </p>
              <div className="my-2">
                <hr />
              </div>
              <p className="flex justify-between items-end mt-2">
                <span className="text-[15px]">Thành tiền:</span>
                <span className="text-yellow font-semibold">
                  {Intl.NumberFormat().format(totalPrice - totalPrice * 0.05)}
                </span>
              </p>
              <div className="mt-3">
                <p>Hình thức thành toán</p>
                <Select
                  className="w-full mt-2"
                  onChange={(e) => setType(e)}
                  placeholder="Chọn hình thức thanh toán"
                  options={[
                    { value: "DELIVERY", label: "Thanh toán khi nhận hàng" },
                  ]}
                />
              </div>
              <div className="flex justify-between mt-3 items-end">
                <p>Địa chỉ</p>
                <span
                  className="hover:text-yellow cursor-pointer"
                  onClick={() => setIsAddress(true)}
                >
                  <RiEditFill />
                </span>
              </div>
              <p className="mt-2">
                {user?.location ? (
                  <span className="text-yellow">{user?.location}</span>
                ) : (
                  <span className="text-primary">Chưa có địa chỉ</span>
                )}
              </p>
              <div className="flex mt-3">
                <p>Số điện thoại</p>
              </div>
              <p className="mt-2">
                {user?.phone ? (
                  <span className="text-yellow">{user?.phone}</span>
                ) : (
                  <span className="text-primary">Chưa có số điện thoại</span>
                )}
              </p>
              <div className="flex mt-3">
                <p>Ghi chú</p>
              </div>
              <Input.TextArea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Tin nhắn"
              />
              <Button
                type="primary"
                className="w-full bg-yellow mt-4"
                size="large"
                onClick={handleCreateOrder}
                loading={loadingOrder}
              >
                Đặt hàng
              </Button>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={isAddress}
        onCancel={() => setIsAddress(false)}
        footer={false}
        title="Cập nhật địa chỉ"
      >
        <Form layout="vertical" form={form} onFinish={onUploadInfo}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Trường này không được để trống!" },
            ]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            label="Tỉnh/Thành phố"
            name="province"
            rules={[
              { required: true, message: "Trường này không được để trống!" },
            ]}
          >
            <Select
              showSearch
              options={provinces?.map((item: any) => ({
                value: item?.name,
                label: item?.name,
              }))}
              placeholder="Chọn tỉnh/thành phố"
            />
          </Form.Item>
          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[
              { required: true, message: "Trường này không được để trống!" },
            ]}
          >
            <Select
              showSearch
              options={districts?.map((item: any) => ({
                value: item?.name,
                label: item?.name,
              }))}
              placeholder="Chọn quận/huyện"
            />
          </Form.Item>
          <Form.Item
            label="Phường/Xã"
            name="ward"
            rules={[
              { required: true, message: "Trường này không được để trống!" },
            ]}
          >
            <Select
              showSearch
              options={wards?.map((item: any) => ({
                value: item?.name,
                label: item?.name,
              }))}
              placeholder="Chọn pường/xã"
            />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="detail"
            rules={[
              { required: true, message: "Trường này không được để trống!" },
            ]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <div className="flex justify-end">
            <Space>
              <Button onClick={() => setIsAddress(false)}>Hủy</Button>
              <Button type="primary" className="bg-yellow" htmlType="submit">
                Cập nhật
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default Cart;
