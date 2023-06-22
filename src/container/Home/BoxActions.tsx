import { DeleteOutlined, DislikeFilled, LikeFilled } from "@ant-design/icons";
import { Button, Popover, message } from "antd";
import { useState } from "react";
import { useGlobalState } from "../../hooks/GlobalHooks";
import deletePost from "../../data/deletePost";
import { Link, useNavigate } from "react-router-dom";
import { dataType } from "./PostBox";

export function Actions({ id, likes, author, authorID }: dataType) {
  const [refreshPost, setRefreshPost] = useGlobalState("refreshPost");
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [currentUser] = useGlobalState("currentUser");
  function handleDelete() {
    deletePost(id)
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        if (e) {
          navigate("/");
          setRefreshPost(!refreshPost);
          setClick(false);
        } else {
          message.error("Error while Deleting");
          setClick(false);
        }
      });
  }
  return (
    <div className="flex gap-2 justify-center items-center ">
      <Button className="flex gap-2 justify-center items-center">
        {likes}
        <LikeFilled />
      </Button>
      <Button>
        <DislikeFilled />
      </Button>
      {currentUser.id === authorID ? (
        <Popover
          open={click}
          content={
            <div className="flex justify-center gap-2">
              <Button type="default" danger onClick={handleDelete}>
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

      <Link
        className="capitalize font-bold "
        to={`profile/:${authorID}`}
      >{`${author}`}</Link>
      <p className="capitalize  ">{` Jan 2 ,1001 AD`}</p>
    </div>
  );
}
