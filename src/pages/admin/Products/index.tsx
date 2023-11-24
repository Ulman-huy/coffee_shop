import { PageContainer } from "@ant-design/pro-components";
import { Col } from "antd";

function Products() {
  const content = <Col></Col>;
  return (
    <PageContainer
      header={{ title: "" }}
      breadcrumb={{}}
      className="bg-white"
      content={content}
    />
  );
}

export default Products;
