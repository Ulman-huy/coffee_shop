import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, message, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { useCookies } from "react-cookie";
import { BASE_API } from "../../config/contants";

type UploadProps = {
  name: string;
};

const UploadImage = ({ name }: UploadProps) => {
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState<any>([]);

  //   const getBase64 = (file: any): Promise<string> =>
  //     new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result as string);
  //       reader.onerror = (error) => reject(error);
  //     });
  //   const handlePreview = async (file: any) => {
  //     if (!file.url && !file.preview) {
  //       file.preview = await getBase64(file.originFileObj as RcFile);
  //     }

  //     setPreviewImage(file.url || (file.preview as string));
  //     setPreviewVisible(true);
  //     setPreviewTitle(
  //       file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
  //     );
  //   };
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
    <>
      <Form.Item name={name} getValueFromEvent={getImages}>
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
          onPreview={(e) => {
            console.log(e);
          }}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          accept=".png, .jpg, .jpeg"
          multiple
        >
          {imageUrl ? null : uploadButton}
        </Upload>
      </Form.Item>
    </>
  );
};

export default UploadImage;
