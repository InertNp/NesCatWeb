import { Form } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const TextEditor = () => {
  return (
    <Form.Item
      label=""
      name={"content"}
      className="w-full"
      rules={[{ required: true, message: "Please Add some Content" }]}
    >
      <ReactQuill className="my-10 h-60" />
    </Form.Item>
  );
};

export default TextEditor;
