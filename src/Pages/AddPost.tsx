import { Button, Form } from "antd";

import { setGlobalState, useGlobalState } from "../hooks/GlobalHooks";
import useMessage from "antd/es/message/useMessage";
import UploadImg from "../container/AddPost/UploadImg";
import TextEditor from "../container/AddPost/TextEditor";
import TitleInput from "../container/AddPost/TitleInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPost = () => {
  const navigate = useNavigate();
  const [userData] = useGlobalState("currentUser");
  const [alert, alertText] = useMessage();
  function handleFinish(e: any) {
    // setGlobalState("loading", true);

    const value = {
      username: userData.username,
      topic: e.title,
      content: e.content,
      imgUrl: e.upload?.response.data.name,
    };

    axios.post("http://localhost:9000/post", { ...value }).then((e: any) => {
      console.log(e);
      setGlobalState("loading", false);
      if (e.data === false) {
        alert.error("Your post was not uploaded");
      } else {
        alert.success("Posted Sucessfully");
        navigate("/home");
      }
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
        <div className="w-full flex flex-col md:flex-row md:justify-between  md:items-center">
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
