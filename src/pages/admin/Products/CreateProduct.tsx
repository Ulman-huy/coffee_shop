import { PageContainer } from "@ant-design/pro-components";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { BRAND_LIST } from "../../../data";
import { RedoOutlined } from "@ant-design/icons";
import UploadImage from "../../../components/UploadImage";
import { useState } from "react";
import dayjs from "dayjs";
import { POST } from "../../../service";
import { toast } from "react-toastify";

function CreateProduct() {
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
        console.log({ response });
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

  const content = (
    <Form layout="vertical" form={form} onFinish={onFinish} name="productForm">
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
            rules={[{ required: true, message: "Chọn thương hiệu sản phẩm!" }]}
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
            name="sale"
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
      <Row justify="space-between">
        <Button icon={<RedoOutlined />} onClick={() => form.resetFields()}>
          Nhập lại
        </Button>
        <Button
          size="large"
          type="primary"
          className="bg-yellow"
          htmlType="submit"
          loading={loading}
        >
          Thêm sản phẩm
        </Button>
      </Row>
    </Form>
  );
  return (
    <PageContainer
      header={{ title: "" }}
      breadcrumb={{}}
      className="bg-white"
      content={content}
    />
  );
}

export default CreateProduct;
