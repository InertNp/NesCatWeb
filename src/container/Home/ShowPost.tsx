import { List } from "antd";
import { setGlobalState } from "../../hooks/GlobalHooks";
import ListPost, { dataType } from "./ListPost";
import { useEffect, useState } from "react";

const ShowPost = () => {
  const [data, setData] = useState([]);

  const fetchPosts = () => {
    fetch(`http://localhost:9000/posts/`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res.response);
        console.log(res);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <List
      className="w-full h-full"
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
      renderItem={(item: dataType) => <ListPost {...item} />}
    />
  );
};

export default ShowPost;
