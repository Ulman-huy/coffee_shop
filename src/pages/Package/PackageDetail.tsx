import { Link, useNavigate, useParams } from "react-router-dom";
import { GET } from "../../service";
import { useContext, useEffect, useState } from "react";
import { PackageType } from "../../types";
import { GlobalContext } from "../../context";
import dayjs from "dayjs";
import { Button, Space } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";

function PackageDetail() {
  const { _id } = useParams();
  const [pkg, setPkg] = useState<PackageType | undefined>();
  const { setLoading }: any = useContext(GlobalContext);
  const navigate = useNavigate();
  const getPackage = async () => {
    const options = {
      url: "order/package/" + _id,
    };
    setLoading(true);
    await GET(options)
      .then((response) => {
        if (response) {
          setPkg(response[0]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPackage();
  }, [_id]);

  return (
    <div
      style={{ minHeight: "calc(100vh - 529px)" }}
      className="flex justify-center mt-5"
    >
      {pkg ? (
        <div className="max-w-default w-full">
          <h2 className="text-[22px] font-semibold">
            Đơn hàng:
            <span className="text-yellow ms-2">{_id}</span>
          </h2>
          <div className="mt-3 p-4 rounded-lg bg-grey relative text-[15px]">
            <p className="font-medium text-base">Thông tin đơn hàng:</p>
            <p>
              Thời gian tạo đơn:{" "}
              <span className="text-yellow">
                {dayjs(pkg?.createdAt).format("hh:mm A, DD-MM-YYYY")}
              </span>
            </p>
            <p>
              Trạng thái: <span className="text-yellow">Chờ xử lý</span>
            </p>
            <p>
              Điện thoại: <span className="text-yellow">{pkg?.phone}</span>
            </p>
            <p>
              Địa chỉ: <span className="text-yellow">{pkg?.location}</span>
            </p>
            <p>
              Ghi chú: <span className="text-yellow">{pkg?.message}</span>
            </p>
            <p>
              Thanh toán:{" "}
              <span className="text-yellow">
                {Intl.NumberFormat().format(pkg?.price ?? 0)} đ
              </span>
            </p>
            <div className="absolute bottom-4 right-4">
              <Space>
                <Button type="primary" className="font-semibold bg-yellow">
                  Xác nhận
                </Button>
                <Button className="font-semibold text-yellow border-yellow">
                  Hủy
                </Button>
              </Space>
            </div>
          </div>
          <div className="">
            {pkg?.cart.map((item) => (
              <div
                key={item.product_id._id}
                className="mt-3 p-4 flex gap-2 rounded-lg bg-grey mb-3"
              >
                <div className="w-[80px] h-[80px] aspect-square">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={item.product_id.images.split(",")[0]}
                    alt=""
                  />
                </div>
                <div>
                  <Link
                    to={
                      `/products/` +
                      item.product_id._id +
                      "/" +
                      item.product_id.slug
                    }
                    className="text-yellow"
                  >
                    {item.product_id.name}
                  </Link>
                  <p className="text-[14px]">
                    Số lượng:{" "}
                    <span className="text-yellow">{item.quantity}</span>
                  </p>
                  <p>
                    Thành tiền:{" "}
                    <span className="text-yellow">
                      {Intl.NumberFormat().format(
                        item.quantity * item.product_id.price
                      )}{" "}
                      đ
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-[220px] justify-center">
          <p className="text-[24px]">Đơn hàng không tồn tại. Oops!</p>
        </div>
      )}
    </div>
  );
}

export default PackageDetail;
