import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, Upload, message } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { url } from "../../data/url";

const UploadImg = () => {
  const [upload, setUpload] = useState<string>();
  const [loadimg, setLoadImg] = useState(false);
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  return (
    <Form.Item
      name="upload"
      valuePropName="file"
      getValueFromEvent={(e) => {
        return e?.file;
      }}
      className="basis-1/3 w-full h-full  flex justify-center items-center"
    >
      <Upload
        beforeUpload={beforeUpload}
        name="avatar" //key for uplading
        action={`${url}/img`}
        method={"post"}
        maxCount={1}
        showUploadList={false}
        onChange={(e) => {
          if (e.file.status === "done") {
            setUpload(e.file?.response?.data?.name);
            setLoadImg(true);
          } else {
            if (e.file.status === "uploading") {
            } else {
              message.error("An error occured while uploading");
            }
          }
        }}
      >
        {loadimg ? (
          <Image
            src={`${url}/img/${upload}`}
            className="object-cover"
            width={180}
            height={180}
            preview={false}
          />
        ) : (
          <div className="text-blue-700 border-img w-[180px] h-[180px] flex flex-col justify-center items-center border-image">
            <PlusOutlined style={{ fontSize: "20px" }} />
            <div>Upload</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );
};

export default UploadImg;
