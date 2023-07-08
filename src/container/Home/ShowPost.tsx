import { List } from "antd";
import { setGlobalState, useGlobalState } from "../../hooks/GlobalHooks";
import { PostBox, dataType } from "./PostBox";
import { useEffect, useState } from "react";
import showPosts from "../../data/showPosts";

const ShowPost = () => {
  const [data, setData] = useState([]);
  const [refreshPost] = useGlobalState("refreshPost");
  const fetchPosts = () => {
    showPosts()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res.response);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshPost]);

  return (
    <List
      className="w-full "
      itemLayout="vertical"
      pagination={{
        onChange: () => {
          setGlobalState("loading", true);
          setInterval(() => {
            setGlobalState("loading", false);
          }, 1000);
        },
        pageSize: 4,
        responsive: true,
        hideOnSinglePage: true,
        position: "bottom",
        align: "center",
      }}
      dataSource={data}
      renderItem={(item: dataType) => <PostBox {...item} />}
    />
  );
};

export default ShowPost;
