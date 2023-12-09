import { useContext, useEffect, useState } from "react";
import { PackageType, ProductType } from "../../types";
import { GET } from "../../service";
import { GlobalContext } from "../../context";
import { Tooltip } from "antd";
import { RiShareBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Package() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const { setLoading }: any = useContext(GlobalContext);

  const getPackages = async () => {
    const options = {
      url: "order/package",
    };
    setLoading(true);
    await GET(options)
      .then((response) => {
        if (response) {
          setPackages(response);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <>
      <div
        style={{ minHeight: "calc(100vh - 529px)" }}
        className="flex justify-center mt-5"
      >
        <div className="max-w-default w-full">
          <h2 className="text-[22px] font-semibold">
            Đơn hàng của tôi (
            <span className="text-yellow">{packages.length}</span>)
          </h2>

          <div className="mt-4">
            {packages.map((pkg) => (
              <PackageItem key={pkg._id} pkg={pkg} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const PackageItem = ({ pkg }: { pkg: PackageType }) => {
  return (
    <div className="p-4 bg-grey rounded-lg mb-3 ">
      <div className="gap-3 flex justify-between">
        <div className="flex gap-2">
          <div className="w-[80px] h-[80px] aspect-square">
            <img
              src={pkg.cart[0].product_id.images.split(",")[0]}
              className="w-full h-full object-cover rounded-md"
              alt=""
            />
          </div>
          <div>
            <p className="font-semibold">
              Mã đơn hàng: <span className="text-yellow">{pkg._id}</span>
            </p>
            {pkg.cart.map(
              (item: { product_id: ProductType; quantity: number }) => (
                <Link
                  to={
                    `/products/` +
                    item.product_id._id +
                    "/" +
                    item.product_id.slug
                  }
                  key={item.product_id._id}
                  className="text-[14px] block hover:underline"
                >
                  {item.product_id.name}{" "}
                  <span className="text-yellow">x{item.quantity}</span>
                </Link>
              )
            )}
          </div>
        </div>
        <div className="h-full w-[250px] flex-shrink-0">
          <div className="text-right flex justify-end items-center">
            <span className="text-yellow font-bold">Chờ xử lý</span>
            <Tooltip title="Xem chi tiết">
              <Link className="ms-2 text-[22px]" to={`/package/${pkg._id}`}>
                <RiShareBoxLine />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <p>
          Địa chỉ: <span className="text-yellow">{pkg.location}</span>
        </p>
        <p className="mt-2">
          Thanh toán:{" "}
          <span className="text-[18px] font-semibold text-yellow">
            {Intl.NumberFormat().format(pkg.price)} đ
          </span>
        </p>
      </div>
    </div>
  );
};

export default Package;
