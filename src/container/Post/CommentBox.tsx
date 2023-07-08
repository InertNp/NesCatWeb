import { Button, Form, Upload, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useGlobalState } from "../../hooks/GlobalHooks";
import TextEditor from "../AddPost/TextEditor";

interface data {
  id: any;
}
const CommentBox = ({ id }: data) => {
  const [form] = Form.useForm();
  const [refreshPost, setRefreshPost] = useGlobalState("refreshComment");
  const [currentUser] = useGlobalState("currentUser");
  function handleFinish(e: any) {
    if (e.content) {
      if (e.avatar) {
        const content = e.content;
        const imgUrl = e.avatar.file.response.data.name;
        const username = currentUser.username;
        const postId = id;
        const value = {
          username: username,
          imgUrl: imgUrl,
          postId: postId,
          content: content,
        };
        fetch("http://localhost:9000/comment", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        })
          .then((res) => {
            return res.json();
          })
          .then(() => {
            message.success("Commented Sucessfully");
          });
        setRefreshPost(!refreshPost);
        form.resetFields();
      } else {
        const content = e.content;
        const username = currentUser.username;
        const postId = id;
        const value = {
          username: username,
          postId: postId,
          content: content,
        };
        fetch("http://localhost:9000/comment", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        })
          .then((res) => {
            return res.json();
          })
          .then(() => {
            message.success("Commented Sucessfully");
          });
        setRefreshPost(!refreshPost);
        form.resetFields();
      }
    } else {
      message.error("Enter the Content");
    }
    form.resetFields();
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(e) => {
        handleFinish(e);
      }}
    >
      <TextEditor />
      <div className="w-full justify-center gap-10 flex m-0">
        <FormItem name={"avatar"}>
          <Upload
            name="avatar" //key for uplading
            action="http://localhost:9000/img"
            method={"post"}
            listType="text"
            maxCount={1}
          >
            <Button>Attach Image</Button>
          </Upload>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Comment
          </Button>
        </FormItem>
      </div>
    </Form>
  );
};

export default CommentBox;
