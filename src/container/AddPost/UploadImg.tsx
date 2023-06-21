import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";

const UploadImg = () => {
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
        name="avatar" //key for uplading
        action="http://localhost:9000/img"
        method={"post"}
        listType="picture-card"
        maxCount={1}
      >
        <div className="text-blue-700">
          <PlusOutlined style={{ fontSize: "20px" }} />
          <div>Upload</div>
        </div>
      </Upload>
    </Form.Item>
  );
};

export default UploadImg;
