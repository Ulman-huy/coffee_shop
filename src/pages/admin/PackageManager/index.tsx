import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Button, Modal, Space, Table, Tooltip, message } from "antd";
import { GET } from "../../../service";
import { PageContainer } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { MdCheck } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";

interface IPackage {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  location: string;
  message: string;
  status: string;
  cart: [
    {
      _id: string;
      product_id: string;
      quantity: number;
    }
  ];
  createdAt: string;
  updatedAt: string;
  price: number;
}

interface IPackageDetail {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  location: string;
  message: string;
  quantity: number;
  status: string;
  createdAt: string;
  price: number;
  cart: [
    {
      _id: string;
      quantity: number;
      product_id: {
        _id: string;
        name: string;
        price: number;
        images: string;
        status: string;
      };
    }
  ];
}

function PackageManager() {
  const [users, setUsers] = useState<IPackage[]>([]);
  const [_totalPage, setTotalPage] = useState<number>();
  const [page, _setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [id, setId] = useState("");
  const [dataPackage, setDataPackage] = useState<IPackageDetail | undefined>(
    undefined
  );

  const getPackageDetail = async (id: string) => {
    const options = {
      url: "order/admin/package/" + id,
    };
    await GET(options)
      .then((response) => {
        if (response) setDataPackage(response[0]);
      })
      .catch(() => {
        message.error("Lấy thông tin đơn hàng thất bại!");
      });
  };

  useEffect(() => {
    if (id) {
      getPackageDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (!isShow) {
      setId("");
      setDataPackage(undefined);
    }
  }, [isShow]);

  const getDataUser = async () => {
    const options = {
      url: "order/admin/package",
      params: {
        page,
        limit: 10,
      },
    };
    setLoading(true);
    await GET(options)
      .then((response: any) => {
        if (response) {
          setUsers(response.data);
          setTotalPage(response.totalPage);
        }
      })
      .catch(() => {
        message.error("Lấy thông tin khách hàng thất bại!");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getDataUser();
  }, [page]);

  const colums: ColumnsType<IPackage> = [
    {
      key: "_id",
      dataIndex: "_id",
      title: "ID",
      render: (id) => (
        <Tooltip title={id}>
          <span className="max-w-[60px] line-clamp-1">{id}</span>
        </Tooltip>
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Tên",
      render: (id) => <span className="font-medium text-yellow">{id}</span>,
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Số điện thoại",
      render: (id) => <span className="font-medium text-yellow">{id}</span>,
    },
    {
      key: "location",
      dataIndex: "location",
      title: "Địa chỉ",
      render: (location) => (
        <Tooltip title={location}>
          <span className="max-w-[200px] line-clamp-1">{location}</span>
        </Tooltip>
      ),
    },
    {
      key: "message",
      dataIndex: "message",
      title: "Ghi chú",
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Thanh toán",
      render: (message) => (
        <span className="font-medium text-yellow">
          {Intl.NumberFormat().format(message)} đ
        </span>
      ),
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "Thời gian",
      render: (text) => (
        <span className="font-medium text-yellow">
          {dayjs(text).format("hh:mm A, DD-MM-YYYY")}
        </span>
      ),
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Trạng thái",
      render: (text) => <span className="font-medium text-yellow">{text}</span>,
    },
    {
      key: "action",
      title: "Thao tác",
      render: (record) => (
        <Space>
          <Tooltip title="Xem đơn hàng">
            <Button
              className="flex items-center justify-center"
              icon={<HiMiniViewfinderCircle />}
              onClick={() => {
                setIsShow(true);
                setId(record._id);
              }}
            />
          </Tooltip>
          <Tooltip title="Xác nhận đơn hàng">
            <Button
              className="flex items-center justify-center"
              icon={<MdCheck />}
            />
          </Tooltip>
          <Tooltip title="Từ chối đơn hàng">
            <Button
              className="flex items-center justify-center"
              icon={<BiTaskX />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const content = (
    <>
      <Table columns={colums} dataSource={users} />
    </>
  );
  return (
    <>
      <PageContainer
        header={{ title: "" }}
        loading={loading}
        breadcrumb={{}}
        className="bg-white table__data"
        style={{ padding: 0 }}
        content={content}
      />
      <Modal
        open={isShow}
        onCancel={() => setIsShow(false)}
        footer={false}
        width={800}
      >
        <p className="font-semibold">Thông tin đơn hàng</p>
        <p>
          Đơn hàng: <span className="text-yellow font-semibold">{id}</span>
        </p>
        <p>
          Họ tên:{" "}
          <span className="text-yellow font-semibold">{dataPackage?.name}</span>
        </p>
        <p>
          Số điện thoại:{" "}
          <span className="text-yellow font-semibold">
            {dataPackage?.phone}
          </span>
        </p>
        <p>
          Địa chỉ:{" "}
          <span className="text-yellow font-semibold">
            {dataPackage?.location}
          </span>
        </p>
        <p>
          Ghi chú:{" "}
          <span className="text-yellow font-semibold">
            {dataPackage?.message}
          </span>
        </p>
        <p>
          Thời gian tạo:{" "}
          <span className="text-yellow font-semibold">
            {dayjs(dataPackage?.createdAt).format("hh:mm A, DD-MM-YYYY")}
          </span>
        </p>
        <p>
          Trạng thái:{" "}
          <span className="text-yellow font-semibold">
            {dataPackage?.status}
          </span>
        </p>
        <p>
          Thanh toán:{" "}
          <span className="text-yellow font-semibold">
            {Intl.NumberFormat().format(dataPackage?.price ?? 0)} đ
          </span>
        </p>
        <p className="font-semibold">Sản phẩm</p>
        {dataPackage?.cart.map((item: any) => (
          <div key={item?._id} className="flex gap-2">
            <div className="w-[80px] h-[80px] mt-2">
              <img src={item.product_id?.images.split(",")[0]} alt="" />
            </div>
            <div>
              <p>{item.product_id?.name}</p>
              <p>x{item.quantity}</p>
              <p>{Intl.NumberFormat().format(item.product_id?.price)} đ</p>
            </div>
          </div>
        ))}
      </Modal>
    </>
  );
}

export default PackageManager;
