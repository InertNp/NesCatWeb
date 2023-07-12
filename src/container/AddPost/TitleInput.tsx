import { Form, Input } from "antd";

const TitleInput = () => {
  return (
    <Form.Item
      label="Title"
      name={"title"}
      className="basis-2/3 px-3"
      rules={[
        { required: true, message: "Please Enter Topic." },
        { max: 50, message: "Topic Must be less than 50 Characters" },
        { min: 5, message: "Topic Must be more than 5 Characters" },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default TitleInput;
