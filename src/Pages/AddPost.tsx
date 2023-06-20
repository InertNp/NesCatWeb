import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { setGlobalState, useGlobalState } from "../hooks/GlobalHooks";
import useMessage from "antd/es/message/useMessage";

const AddPost = () => {
  const [userData] = useGlobalState("currentUser");
  const [alert, alertText] = useMessage();

  return (
    <div className="w-full mt-10 flex justify-center items-center">
      {alertText}
      <Form
        onFinish={(e) => {
          setGlobalState("loading", true);
          console.log(e);
          const value = {
            authorId: userData.id,
            author: userData.name,
            title: e.title,
            des: e.des,
            imgUrl: e.upload?.response.data.name,
          };
          fetch("http://localhost:9000/post", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
          })
            .then((response) => {
              return response.json();
            })
            .then((e) => {
              setGlobalState("loading", false);
              if (e === "false") {
                alert.error("Your post was not uploaded");
              } else {
              }
              console.log(e);
              // alert.info(e);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        layout="vertical"
        initialValues={{ size: "large" }}
        size={"large"}
        className="w-full"
      >
        {/* upload */}
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="file"
          getValueFromEvent={(e) => {
            return e?.file;
          }}
          className="flex w-full justify-center items-center"
        >
          <Upload
            name="avatar" //key for uplading
            action="http://localhost:9000/img"
            method={"post"}
            listType="picture-card"
            maxCount={1}
          >
            <div>
              <PlusOutlined />
              <div>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Title"
          name={"title"}
          rules={[{ required: true, message: "Please Enter Title" }]}
        >
          <Input />
        </Form.Item>
        {/* description */}
        <Form.Item label="Desc" name={"des"}>
          <TextArea
            className="max-h-[400px] h-[100px] overflow-hidden"
            maxLength={700}
          />
        </Form.Item>
        {/* button */}
        <Form.Item
          label=""
          className="w-full  flex justify-center items-center"
        >
          <Button type="default" htmlType="submit" className="w-40">
            Upload
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPost;
