import { Form } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const TextEditor = () => {
  return (
    <Form.Item
      label="Content"
      name={"des"}
      className="px-4 w-full h-[300px]  "
      rules={[{ required: true, message: "Please Add some Content" }]}
    >
      <ReactQuill className="h-[200px] " />
    </Form.Item>
  );
};

export default TextEditor;
