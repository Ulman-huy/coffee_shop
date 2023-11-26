import { PageContainer } from "@ant-design/pro-components";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState, useId } from "react";
import { DELETE, GET, PUT } from "../../../service";
import { IoIosImages } from "react-icons/io";
import ViewImage from "./components/ViewImage";
import dayjs from "dayjs";
import StatusTag from "../../../components/StatusTag";
import { AiFillEdit } from "react-icons/ai";
import { FaRegStopCircle, FaTrash } from "react-icons/fa";
import EditProduct from "./components/EditProduct";
import { BRAND_LIST } from "../../../data";

export type DataType = {
  key: React.Key;
  _id: string;
  name: string;
  price: number;
  type: string;
  description: string;
  info: string;
  like: number;
  sales: number;
  date: string;
  status: string;
  brand: string;
};

function Products() {
  const key = useId();
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [_totalPage, setTotalPage] = useState<number>();
  const [modalImage, setModalImage] = useState<boolean>(false);
  const [images, setImages] = useState<string>("");
  const [edit, setEdit] = useState<DataType | undefined>(undefined);
  const [modalEdit, setModalEdit] = useState<boolean>(false);

  const getProductData = async () => {
    setLoading(true);
    await GET({ url: "product/all" })
      .then((response) => {
        if (response) {
          setTableData(response.data);
          setTotalPage(response.totalPage);
        }
      })
      .catch(() => {
        message.error("Lấy thông tin sản phẩm thất bại!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!modalEdit) {
      setEdit(undefined);
    }
  }, [modalEdit]);

  const handleChangeStatusRecord = async (_id: string, status: string) => {
    setLoading(true);
    const options = {
      url: "product/" + _id,
      body: {
        status,
      },
    };
    await PUT(options)
      .then((response) => {
        if (response.message === "OK") {
          getProductData();
          message.success("Đã xóa sản phẩm!");
        }
      })
      .catch(() => {
        message.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      key: key,
      title: "ID",
      dataIndex: "_id",
      render: (id) => (
        <Tooltip title={id}>
          <span>{id.slice(-5)}</span>
        </Tooltip>
      ),
    },
    {
      key: "type",
      title: "Loại sản phẩm",
      dataIndex: "type",
      render: (type) => <StatusTag full upper status={type} />,
    },
    {
      key: "brand",
      title: "Thương hiệu",
      dataIndex: "brand",
    },
    {
      key: "name",
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (name) => (
        <Tooltip title={name}>
          <span className="font-medium text-yellow line-clamp-2 max-w-[300px]">
            {name}
          </span>
        </Tooltip>
      ),
    },
    {
      key: "price",
      title: "Giá sản phẩm",
      dataIndex: "price",
      render: (price) => (
        <span className="font-medium text-yellow">
          {Intl.NumberFormat().format(price)} VND
        </span>
      ),
    },
    {
      key: "date",
      title: "Hạn sử dụng",
      dataIndex: "date",
      render: (date) => (
        <span className="font-medium text-yellow">
          {dayjs(date).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      key: "sold",
      title: "Đã bán",
      dataIndex: "sold",
    },
    {
      key: "images",
      title: "Hình ảnh",
      dataIndex: "images",
      render: (images) => (
        <Row justify="center">
          <Button
            className="cursor-pointer flex justify-center items-center text-[20px]"
            type="text"
            onClick={() => {
              setModalImage(true);
              setImages(images);
            }}
          >
            <IoIosImages />
          </Button>
        </Row>
      ),
      align: "center",
    },
    {
      key: "status",
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => <StatusTag full upper status={status} />,
    },
    {
      key: "action",
      title: "Hành động",
      render: (_: any, record: DataType) => (
        <Space>
          <Tooltip title="Cập nhật sản phẩm">
            <Button
              onClick={() => {
                setEdit(record);
                setModalEdit(true);
              }}
            >
              <AiFillEdit />
            </Button>
          </Tooltip>
          {record.status === "ACTIVE" ? (
            <Popconfirm
              title="Bạn chắc chắn muốn dừng bán sản phẩm?"
              okText="Dừng"
              cancelText="Hủy"
              onConfirm={() => handleChangeStatusRecord(record._id, "STOP")}
            >
              <Tooltip title="Dừng bán sản phẩm">
                <Button>
                  <FaRegStopCircle />
                </Button>
              </Tooltip>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Bạn muốn bán lại sản phẩm?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleChangeStatusRecord(record._id, "ACTIVE")}
            >
              <Tooltip title="Dừng bán sản phẩm">
                <Button>
                  <FaRegStopCircle />
                </Button>
              </Tooltip>
            </Popconfirm>
          )}
          <Popconfirm
            title="Bạn chắc chắn muốn xóa sản phẩm?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleChangeStatusRecord(record._id, "DELETED")}
          >
            <Tooltip title="Xóa sản phẩm">
              <Button>
                <FaTrash />
              </Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const content = (
    <Col>
      <Row className="mb-5 flex-nowrap" justify="space-around">
        <Typography.Title className="whitespace-nowrap" level={5}>
          Tìm kiếm
        </Typography.Title>
        <Form className="w-full">
          <Row justify="space-around" className="w-full">
            <Form.Item name="type" className="max-w-[300px] w-full">
              <Select
                options={[
                  { value: "COFFEE", label: "Cà Phê" },
                  { value: "TEA", label: "Trà" },
                  { value: "DISHED", label: "Bánh Kẹo" },
                ]}
                placeholder="Loại sản phẩm"
              />
            </Form.Item>
            <Form.Item name="brand" className="max-w-[300px] w-full">
              <Select
                options={BRAND_LIST.map((brand: string) => ({
                  value: brand,
                  label: brand,
                }))}
                placeholder="Thương hiệu"
              />
            </Form.Item>
            <Form.Item name="name" className="max-w-[300px] w-full">
              <Input placeholder="Tên sản phẩm" />
            </Form.Item>
          </Row>
          <Row justify="end">
            <Button type="primary" className="bg-yellow">
              Tìm kiếm
            </Button>
          </Row>
        </Form>
      </Row>
      <Table columns={columns} dataSource={tableData} loading={loading} />
    </Col>
  );

  useEffect(() => {
    if (images && !modalImage) {
      setImages("");
    }
  }, [modalImage]);
  return (
    <>
      <PageContainer
        header={{ title: "" }}
        breadcrumb={{}}
        className="bg-white table__data"
        style={{ padding: 0 }}
        content={content}
      />
      <Modal
        open={modalImage}
        onCancel={() => setModalImage(false)}
        footer={false}
      >
        <ViewImage images={images} />
      </Modal>
      <Modal
        open={modalEdit}
        footer={false}
        onCancel={() => setModalEdit(false)}
        width={"75vw"}
      >
        <EditProduct product={edit} open={modalEdit} onClose={setModalEdit} />
      </Modal>
    </>
  );
}

export default Products;
