import { DeleteOutlined, LikeFilled } from "@ant-design/icons";
import { Button, Popover, message } from "antd";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/GlobalHooks";
import deletePost from "../../data/deletePost";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import likePost from "../../data/likePost";

interface dataType {
  postId: number;
  username?: string;
  likes?: number;
}

export function Actions({ postId, username, likes }: dataType) {
  const [likesonPost, setLikes] = useState(likes || 0);
  const [liked, setLiked] = useState(false);
  const [refreshPost, setRefreshPost] = useGlobalState("refreshPost");
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [currentUser] = useGlobalState("currentUser");
  function handleDelete() {
    deletePost(postId)
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
  useEffect(() => {
    axios
      .post("http://localhost:9000/checkLike", {
        id: JSON.stringify(postId),
        username: JSON.stringify(currentUser.username),
      })
      .then(function (response) {
        // console.log(response.data);
        if (response.data) {
          setLiked(true);
        }
      });
  }, []);

  return (
    <div className="flex flex-row  gap-2 justify-center items-center ">
      <Button
        onClick={() => {
          const username = currentUser.username;
          likePost({ postId, username });
          setLikes(likesonPost + 1);
          setLiked(true);
        }}
        className={`flex gap-2 justify-center items-center`}
        disabled={liked}
      >
        {likesonPost == 0 ? null : likesonPost}
        <LikeFilled className={`${!liked ? "text-black" : "text-blue-800"}`} />
      </Button>

      {/* delete button */}
      {currentUser.username === username ? (
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
    </div>
  );
}
