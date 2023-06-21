import {
  HomeFilled,
  MoreOutlined,
  NotificationFilled,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, MenuProps } from "antd";

import { setGlobalState, useGlobalState } from "../../hooks/GlobalHooks";
import { Link, useNavigate } from "react-router-dom";

const navLink = `text-black text-md cursor-pointer flex justify-start capitalize items-center gap-1`;

const MenuLogIn = () => {
  const [currentUser] = useGlobalState("currentUser");

  const navigate = useNavigate();
  const itemLogin: MenuProps["items"] = [
    {
      label: (
        <Link className={navLink} to={"/"}>
          <HomeFilled style={{ fontSize: "16px " }} />
          Home
        </Link>
      ),
      key: "home",
    },
    {
      label: (
        <Link className={navLink} to={"/addpost"}>
          <PlusOutlined style={{ fontSize: "16px " }} />
          Add Post
        </Link>
      ),
      key: "add",
    },
    {
      label: (
        <Link className={navLink} to={"/notification"}>
          <NotificationFilled style={{ fontSize: "16px " }} />
          notification
        </Link>
      ),
      key: "notify",
    },
    {
      label: (
        <Link className={navLink} to={"/profile/:id"}>
          <Avatar
            src={
              currentUser.imgUrl == null
                ? `http://localhost:9000/img/avatar.jpg`
                : `http://localhost:9000/img/${currentUser.imgUrl}`
            }
          />
          {currentUser?.username}
        </Link>
      ),
      key: "Nam",
    },

    {
      key: "Sth",
      popupOffset: [0, 20],
      label: (
        <div className="flex justify-start items-center h-full gap-2 ">
          <SettingOutlined style={{ fontSize: "25px" }} />
          <p className="block md:hidden">Setting</p>
        </div>
      ),
      children: [
        {
          label: <Link to={"./"}>Setting</Link>,
          key: "setting4",
        },
        {
          label: <Link to={"./"}>Help</Link>,
          key: "setting3",
        },
        {
          label: (
            <div
              className="w-full  flex justify-start items-start"
              onClick={async () => {
                setGlobalState("isLoggedIn", false);
                localStorage.clear();
                navigate("/login");
              }}
            >
              Sign Out
            </div>
          ),
          key: "setting1",
        },
      ],
    },
  ];
  return (
    <Menu
      mode="horizontal"
      items={itemLogin}
      className="h-full  flex justify-end items-center w-2/3 "
      overflowedIndicator={<MoreOutlined style={{ fontSize: "20px" }} />}
      forceSubMenuRender={true}
    />
  );
};

export default MenuLogIn;
