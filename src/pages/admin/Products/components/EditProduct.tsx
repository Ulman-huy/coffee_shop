import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { BRAND_LIST } from "../../../../data";
import UploadImage from "../../../../components/UploadImage";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { POST } from "../../../../service";
import { toast } from "react-toastify";
import { DataType } from "..";

type Props = {
  product: DataType | undefined;
  open: boolean;
  onClose: (open: boolean) => void;
};

function EditProduct({ product, open, onClose }: Props) {
  const [form] = Form.useForm();
  const [listImage, setListImage] = useState<any>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    const images = listImage.map((img: any) => img.response.url).join(",");

    const data = {
      ...values,
      price: Number(values.price),
      date: dayjs(values.date),
      images: images,
    };
    const options = {
      url: "product/create",
      body: data,
    };
    setLoading(true);

    await POST(options)
      .then((response) => {
        if (response.message == "OK") {
          form.resetFields();
          toast.success("Thêm sản phẩm thành công!");
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        name: product?.name,
        type: product?.type,
        price: product?.price,
        date: dayjs(product?.date),
        info: product?.info,
        description: product?.description,
        sales: product?.sales,
        brand: product?.brand,
      });
    } else {
      form.resetFields();
    }
  }, [open]);

  return (
    <>
      <Typography.Title level={4}>Cập nhật sản phẩm</Typography.Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="productForm"
        className="w-full"
      >
        <Row justify="space-between" className="gap-5">
          <Col className="w-[40%]">
            <Form.Item
              name="type"
              label="Loại sản phẩm"
              rules={[{ required: true, message: "Chọn loại sản phẩm!" }]}
            >
              <Select
                options={[
                  { value: "COFFEE", label: "Cà Phê" },
                  { value: "TEA", label: "Trà" },
                  { value: "DISHED", label: "Bánh Kẹo" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="brand"
              label="Thương hiệu"
              rules={[
                { required: true, message: "Chọn thương hiệu sản phẩm!" },
              ]}
            >
              <Select
                options={BRAND_LIST.map((brand: string) => ({
                  value: brand,
                  label: brand,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
            >
              <Input placeholder="Tên sản phẩm" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Giá sản phẩm"
              rules={[{ required: true, message: "Nhập giá sản phẩm!" }]}
            >
              <Input placeholder="Giá sản phẩm" />
            </Form.Item>
            <Form.Item
              name="date"
              label="Ngày hết hạn"
              rules={[{ required: true, message: "Chọn ngày hết hạn!" }]}
            >
              <DatePicker
                placeholder="Chọn ngày hết hạn!"
                className="min-w-[50%]"
              />
            </Form.Item>
            <Form.Item
              name="sales"
              label="Giảm giá (%)"
              rules={[{ required: true, message: "Nhập % giảm giá!" }]}
            >
              <InputNumber
                max={60}
                className="w-full"
                min={0}
                placeholder="Nhập % giảm giá!"
              />
            </Form.Item>
            <Form.Item name="info" label="Thông tin sản phẩm">
              <Input.TextArea placeholder="Nhập thông tin sản phẩm" rows={5} />
            </Form.Item>
          </Col>
          <Col className="flex-1">
            <Form.Item name="description" label="Mô tả thông tin liên quan">
              <Input.TextArea placeholder="Nhập các thông tin khác" rows={18} />
            </Form.Item>
            <Form.Item name="images" label="Hình ảnh sản phẩm">
              <UploadImage setListImage={setListImage} />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Space>
            <Button size="large" onClick={() => onClose(false)}>
              Hủy
            </Button>
            <Button
              size="large"
              type="primary"
              className="bg-yellow"
              htmlType="submit"
              loading={loading}
            >
              Cập nhật
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
}

export default EditProduct;
