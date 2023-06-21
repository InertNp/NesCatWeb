import { Button, Form } from "antd";

import { setGlobalState, useGlobalState } from "../hooks/GlobalHooks";
import useMessage from "antd/es/message/useMessage";
import UploadImg from "../container/AddPost/UploadImg";
import TextEditor from "../container/AddPost/TextEditor";
import TitleInput from "../container/AddPost/TitleInput";

const AddPost = () => {
  const [userData] = useGlobalState("currentUser");
  const [alert, alertText] = useMessage();
  function handleFinish(e: any) {
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
  }

  return (
    <div className="w-full mt-10 flex  flex-col h-full justify-center ">
      {alertText}
      <Form
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{ size: "large" }}
        size={"large"}
        className="w-full h-full  flex flex-col justify-center items-center"
      >
        {/* upload */}
        <div className="w-full flex flex-col md:flex-row md:justify-between border md:items-center">
          <UploadImg />
          <TitleInput />
        </div>
        {/* description */}
        <TextEditor />
        {/* button */}

        <Button type="default" htmlType="submit" className="w-40 ">
          Upload
        </Button>
      </Form>
    </div>
  );
};

export default AddPost;
