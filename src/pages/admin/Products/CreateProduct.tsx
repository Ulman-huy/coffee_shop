import { PageContainer } from "@ant-design/pro-components";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { BRAND_LIST } from "../../../data";
import { RedoOutlined } from "@ant-design/icons";
import UploadImage from "../../../components/UploadImage";

function CreateProduct() {
  const content = (
    <Form layout="vertical">
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
            name="sales"
            label="Giảm giá (%)"
            rules={[
              { required: true, message: "Nhập % giảm giá!" },
              { pattern: /^\d+$/, message: "Giảm giá không hợp lệ!" },
              { max: 60, message: "Giảm giá tối đa 60%!" },
              { min: 5, message: "Giảm giá tối thiểu 5%!" },
            ]}
          >
            <Input placeholder="Nhập % giảm giá!" />
          </Form.Item>
          <Form.Item name="info" label="Thông tin sản phẩm">
            <Input.TextArea placeholder="Nhập thông tin sản phẩm" rows={5} />
          </Form.Item>
        </Col>
        <Col className="flex-1">
          <Form.Item name="description" label="Mô tả thông tin liên quan">
            <Input.TextArea placeholder="Nhập các thông tin khác" rows={18} />
          </Form.Item>
          <Form.Item
            name="images"
            label="Hình ảnh sản phẩm"
            rules={[{ required: true, message: "Tải lên hình ảnh!" }]}
          >
            <UploadImage name="images" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="space-between">
        <Button icon={<RedoOutlined />}>Nhập lại</Button>
        <Button size="large" type="primary" className="bg-yellow">
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
