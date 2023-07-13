import { Button, Upload, message } from "antd";
import { RcFile } from "antd/es/upload";
import axios from "axios";
import { setGlobalState, useGlobalState } from "../../hooks/GlobalHooks";

const ChangeAvatar = () => {
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  // console.log(currentUser);
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  return (
    <Upload
      name="avatar" //key for uplading
      action="http://localhost:9000/img"
      method={"post"}
      listType="text"
      showUploadList={false}
      maxCount={1}
      beforeUpload={beforeUpload}
      onChange={(e) => {
        if (e.file.status === "done") {
          const imageUrl = e.file.response?.data.name;
          setGlobalState("loading", true);
          axios
            .post("http://localhost:9000/changeAvatar", {
              userId: currentUser.userId,
              imageUrl: JSON.stringify(imageUrl),
            })
            .then((res) => {
              if (res.data) {
                setGlobalState("loading", false);
              }
            });
          const data = { ...currentUser, imgUrl: imageUrl };
          setCurrentUser(data);
          localStorage.setItem("data", JSON.stringify(data));
          message.success("Avatar changed!");
        }
      }}
    >
      <Button>Change Avatar</Button>
    </Upload>
  );
};

export default ChangeAvatar;
