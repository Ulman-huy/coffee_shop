import { Row } from "antd";
import { FaRegCopyright } from "react-icons/fa6";

function FooterAdmin() {
  return (
    <Row justify="center" align="middle" className="text-black pb-4">
      <FaRegCopyright />
      <span style={{ paddingInlineStart: 8 }}>• 2023 – Endrosi</span>
    </Row>
  );
}

export default FooterAdmin;
