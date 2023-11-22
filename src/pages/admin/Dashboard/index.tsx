import { PageContainer } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import { Col, Row } from "antd";

function Dashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "Date",
    yField: "scales",
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };
  const content = (
    <Col className="min-h-[75vh]">
      <Row>
        <Col className="bg-[#fff] p-6 rounded-lg">
          <Line {...config} />
        </Col>
      </Row>
    </Col>
  );

  return (
    <PageContainer
      header={{
        title: t("dashboard"),
      }}
      breadcrumb={{}}
      className="dashboard__container"
      content={content}
    />
  );
}

export default Dashboard;
