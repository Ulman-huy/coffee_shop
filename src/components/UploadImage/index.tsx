import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Form, Image, message, Row, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { useCookies } from "react-cookie";
import { BASE_API } from "../../config/contants";

type UploadProps = {
  setListImage: any;
};

const UploadImage = ({ setListImage: setImages }: UploadProps) => {
  const [cookies] = useCookies();
  const [loading, _setLoading] = useState(false);
  const [imageUrl, _setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState<any>([]);

  const beforeUpload = (file: RcFile) => {
    const isValidImage =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isValidImage) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt1M = file.size / 1024 / 1024 < 5;
    if (!isLt1M) {
      message.error("Image is too large!");
    }
    return (isValidImage && isLt1M) || Upload.LIST_IGNORE;
  };

  const handleChange = async ({ fileList: newFileList }: any) => {
    await setFileList(newFileList);
    setImages(newFileList);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getImages = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form.Item name="images" getValueFromEvent={getImages}>
      <Row className="flex-nowrap gap-2">
        {fileList.map((img: any) => {
          if (img.url) {
            return (
              <Col className="w-[100px] h-[100px] overflow-hidden rounded-lg flex-shrink-0 object-center">
                <img className="w-full h-full object-cover" src={img.url} />
              </Col>
            );
          }
          return (
            <Col className="w-[100px] h-[100px] overflow-hidden rounded-lg flex-shrink-0">
              <Image
                className="w-full h-full object-cover object-center"
                src={img?.response?.url}
              />
            </Col>
          );
        })}
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          fileList={fileList}
          action={`${BASE_API}upload`}
          headers={{
            Authorization: "Bearer " + cookies.accessToken,
          }}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          accept=".png, .jpg, .jpeg"
          multiple
        >
          {imageUrl ? null : uploadButton}
        </Upload>
      </Row>
    </Form.Item>
  );
};

export default UploadImage;
