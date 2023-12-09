import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Table, Tooltip, message } from "antd";
import { GET } from "../../../service";
import { PageContainer } from "@ant-design/pro-components";

interface IUser {
  _id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  verify: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  like: Array<string>;
}

function CustomerManager() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [_totalPage, setTotalPage] = useState<number>();
  const [page, _setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getDataUser = async () => {
    const options = {
      url: "user/admin/users",
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

  const colums: ColumnsType<IUser> = [
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
      key: "username",
      dataIndex: "username",
      title: "Tên",
      render: (id) => <span className="font-medium text-yellow">{id}</span>,
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
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
      key: "verify",
      dataIndex: "verify",
      title: "Xác thực",
      render: (verify) => (
        <span className="font-medium text-yellow">
          {verify ? "Đã xác thực" : "-"}
        </span>
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
    </>
  );
}

export default CustomerManager;
