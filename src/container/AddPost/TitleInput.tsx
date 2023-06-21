import { Form, Input } from "antd";

const TitleInput = () => {
  return (
    <Form.Item
      label="Title"
      name={"title"}
      className="basis-2/3 px-3"
      rules={[{ required: true, message: "Please Enter Title" }]}
    >
      <Input />
    </Form.Item>
  );
};

export default TitleInput;
