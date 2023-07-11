import { Button, Form, Image, List, Popover, message } from "antd";
import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../../hooks/GlobalHooks";
import parse from "html-react-parser";
import { DeleteOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
interface datatype {
  id: any;
  author: string;
}
const Comments = ({ id, author }: datatype) => {
  const [data, setData] = useState([] as any);
  const [currentUser] = useGlobalState("currentUser");
  const [click, setClick] = useState(false);

  const [refreshComment, setRefreshComment] = useGlobalState("refreshComment");
  const [edit, setEdit] = useState(false);
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
  function handleDelete(id: number) {
    axios
      .post("http://localhost:9000/deleteComment", {
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
            {edit ? (
              <Form
                layout="vertical"
                onFinish={(e) => {
                  console.log(e);

                  axios
                    .post("http://localhost:9000/updateComment", {
                      id: JSON.stringify(item.commentId),
                      content: e.content,
                    })
                    .then(function (response) {
                      console.log(response.data);
                    });
                  setEdit(false);
                  setRefreshComment(!refreshComment);
                }}
              >
                <Form.Item
                  label=""
                  initialValue={item.content || ""}
                  name={"content"}
                  rules={[
                    { required: true, message: "Please Add some Content" },
                  ]}
                >
                  <ReactQuill />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            ) : (
              <div className="text-md">
                {item.content === undefined || item.content === null
                  ? null
                  : parse(item.content)}
                <Link to={`/user/${item.username}`} className="capitalize mt-4">
                  {item.username}
                </Link>
              </div>
            )}
            {/* actions */}
            <div className="flex flex-row gap-3 mt-5">
              {currentUser.username == author ? (
                <Button>
                  <StarFilled />
                </Button>
              ) : null}
              {currentUser.username == item.username ? (
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
          </List.Item>
        )}
      />
    </div>
  );
};

export default Comments;
