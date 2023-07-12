import { List } from "antd";
import { useEffect, useState } from "react";
import showPosts from "../data/showPosts";
import { useNavigate } from "react-router-dom";

import { useGlobalState } from "../hooks/GlobalHooks";

import DashItems from "../container/Dashboard/DashItems";

const Dashboard = () => {
  const [refreshPost] = useGlobalState("refreshDash");
  const navigate = useNavigate();
  const [currentUser] = useGlobalState("currentUser");
  const [data, setData] = useState([]);
  if (currentUser.userType === "admin") {
  } else {
    navigate("/");
  }
  const fetchPosts = () => {
    showPosts()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res.response);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshPost]);
  return (
    <div>
      <List
        dataSource={data}
        renderItem={(item: any) => <DashItems item={item} />}
      />
    </div>
  );
};

export default Dashboard;
