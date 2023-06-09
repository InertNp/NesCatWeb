import { Button, Image, List, Popover, message } from "antd";
import parse from "html-react-parser";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { setGlobalState, useGlobalState } from "../../hooks/GlobalHooks";
import { useEffect, useState } from "react";
import axios from "axios";
import EditComment from "./EditComment";
import { url } from "../../data/url";

interface itemProp {
  author?: string;
  item: {
    imgUrl: string;
    commentId: number;
    username: string;
    content?: string;
  };
}

const ListItem = ({ item }: itemProp) => {
  const [edit, setEdit] = useState(false);
  const [refreshComment, setRefreshComment] = useGlobalState("refreshComment");
  const [currentUser] = useGlobalState("currentUser");
  const [click, setClick] = useState(false);
  // console.log(currentUser);
  function handleDelete(id: number) {
    axios
      .post(`${url}/deleteComment`, {
        id: JSON.stringify(id),
      })
      .then(function (res) {
        if (res) {
          setRefreshComment(!refreshComment);
          setGlobalState("hide", false);
          setClick(false);
        } else {
          message.error("An error Occured");
        }
      });
  }
  useEffect(() => {
    setEdit(false);
  }, [refreshComment]);

  return (
    <List.Item
      className="border-top border-bot"
      key={item.commentId}
      extra={
        item.imgUrl === "undefined" ||
        item.imgUrl === undefined ||
        item.imgUrl === null ? null : (
          <Image
            width={200}
            height={200}
            alt={`${item.imgUrl}`}
            className="object-cover"
            src={`${url}/img/${item.imgUrl}`}
          />
        )
      }
    >
      <List.Item.Meta />

      <div className="text-md">
        {/* content is here */}
        {edit ? <EditComment data={item} /> : parse(item.content || "")}

        {/* content is upto here */}
        {edit ? null : (
          <Link to={`/user/${item.username}`} className="capitalize mt-4">
            {item.username}
          </Link>
        )}
      </div>

      {/* actions */}
      {edit ? null : (
        <div className="flex flex-row gap-3 mt-5">
          {currentUser.username == item.username ||
          currentUser.userType === "admin" ? (
            <Popover
              open={click}
              content={
                <div className="flex justify-center gap-2">
                  <Button
                    type="default"
                    danger
                    onClick={() => {
                      handleDelete(item.commentId);
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setClick(false);
                    }}
                  >
                    No
                  </Button>
                </div>
              }
              title="Are you Sure?"
              trigger="click"
              onOpenChange={(open: boolean) => {
                setClick(open);
              }}
            >
              <Button type="primary" danger>
                <DeleteOutlined style={{ fontSize: "20px" }} />
              </Button>
            </Popover>
          ) : null}
          {currentUser.username == item.username ? (
            <Button
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit
            </Button>
          ) : null}
        </div>
      )}
    </List.Item>
  );
};

export default ListItem;
