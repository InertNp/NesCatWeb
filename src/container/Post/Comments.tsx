import { List } from "antd";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/GlobalHooks";

import ListItem from "./ListItem";
interface datatype {
  id: any;
  author: string;
}
const Comments = ({ id, author }: datatype) => {
  const [data, setData] = useState([] as any);

  const [refreshComment] = useGlobalState("refreshComment");
  function fetchComment() {
    fetch("http://localhost:9000/comments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((e) => {
        setData(e);
      });
  }

  useEffect(() => {
    fetchComment();
  }, [refreshComment]);

  return (
    <div>
      <h1 className="w-full text-center text-3xl font-extralight">Comments</h1>
      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          pageSize: 5,
        }}
        dataSource={data}
        renderItem={(item: any) => (
          <ListItem key={item.conmmentId} item={item} author={author} />
        )}
      />
    </div>
  );
};

export default Comments;
