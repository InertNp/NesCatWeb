import { Descriptions, Image } from "antd";
import { useGlobalState } from "../hooks/GlobalHooks";
import ChangePassword from "../container/Settings/ChangePassword";
import ChangeAvatar from "../container/Settings/ChangeAvatar";
import { url } from "../data/url";

const Setting = () => {
  const [currentUser] = useGlobalState("currentUser");
  // console.log(currentUser);
  return (
    <div className="flex gap-2">
      <div className=" basis-1/2 flex justify-center items-center  ">
        {currentUser.imgUrl === "undefined" ||
        currentUser.imgUrl === undefined ||
        currentUser.imgUrl === null ? (
          <Image
            src={`${url}/img/avatar.jpg `}
            className="object-cover"
            width={400}
            height={400}
          />
        ) : (
          <Image
            className="object-cover "
            src={`${url}/img/${currentUser.imgUrl}`}
            fallback={`${url}/img/avatar.jpg`}
            width={400}
            height={400}
          />
        )}
      </div>
      <Descriptions
        className="basis-1/2 "
        bordered
        column={1}
        title={
          <div>
            <p>Edit Setting</p>
            <div className="flex gap-2">
              <ChangePassword />
              <ChangeAvatar />
            </div>
          </div>
        }
      >
        <Descriptions.Item label="Username">
          {currentUser.username}
        </Descriptions.Item>
        <Descriptions.Item label="Name">{currentUser.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
        <Descriptions.Item label="Joined On">
          {currentUser.created_date || "Not Avaiable"}
        </Descriptions.Item>
        <Descriptions.Item label="Last Online">
          {currentUser.last_login || "Not Avaiable"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Setting;
