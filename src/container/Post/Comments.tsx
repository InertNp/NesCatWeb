import { Button, Image, List } from "antd";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/GlobalHooks";
import parse from "html-react-parser";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
interface datatype {
  id: any;
  author: string;
}
const Comments = ({ id, author }: datatype) => {
  const [data, setData] = useState([] as any);
  const [currentUser] = useGlobalState("currentUser");
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
          <List.Item
            className="border-top border-bot"
            key={item.title}
            extra={
              item.imgUrl === "undefined" ||
              item.imgUrl === undefined ||
              item.imgUrl === null ? null : (
                <Image
                  width={272}
                  height={200}
                  alt={`${item.imgUrl}`}
                  src={`http://localhost:9000/img/${item.imgUrl}`}
                />
              )
            }
          >
            <List.Item.Meta />
            <div className="text-md">
              {item.content === undefined || item.content === null
                ? null
                : parse(item.content)}
              <Link to={`/user/${item.username}`} className="capitalize mt-4">
                {item.username}
              </Link>
            </div>
            {currentUser.username == author ? (
              <Button className="mt-5">
                <StarFilled />
              </Button>
            ) : null}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Comments;
