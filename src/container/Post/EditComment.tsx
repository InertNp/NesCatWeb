import { Button, Form, message } from "antd";
import axios from "axios";

import ReactQuill from "react-quill";
import { useGlobalState } from "../../hooks/GlobalHooks";
import { url } from "../../data/url";

const EditComment = ({ data }: any) => {
  const [refreshComment, setRefreshComment] = useGlobalState("refreshComment");
  return (
    <Form
      layout="vertical"
      onFinish={(e) => {
        axios
          .post(`${url}/updateComment`, {
            id: JSON.stringify(data.commentId),
            content: e.content,
          })
          .then(function (response) {
            if (response.data) {
              message.success("Comment Edit Sucess");
            } else {
              message.error("An error Occured");
            }
          });
        setRefreshComment(!refreshComment);
      }}
    >
      <p>Being Edited by: {data.username}</p>
      <Form.Item
        label=""
        initialValue={data.content || ""}
        name={"content"}
        rules={[{ required: true, message: "Please Add some Content" }]}
      >
        <ReactQuill />
      </Form.Item>
      <div className="flex justify-center p-0 m-0 items-center">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default EditComment;
