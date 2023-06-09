import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Button, Image, Popover, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, LikeFilled } from "@ant-design/icons";
import { useGlobalState } from "../../hooks/GlobalHooks";
import deletePost from "../../data/deletePost";
import axios from "axios";
import likePost from "../../data/likePost";
import { url } from "../../data/url";
interface dataprop {
  id: any;
  author: Function;
}
interface dataType {
  topic?: string;
  content: string;
  imgUrl?: string;
  username?: string;
  created_date?: string;
  likes?: number;
}
const Post = ({ id, author }: dataprop) => {
  const [data, setData] = useState({} as dataType);
  const [likesonPost, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [click, setClick] = useState(false);
  const [currentUser] = useGlobalState("currentUser");
  const navigate = useNavigate();
  function fetchPost() {
    fetch(`${url}/fullpost`, {
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
        if (e === "false" || e === false) {
          navigate("/");
        } else {
          setData(e);
          author(e?.username);
          setLikes(e.likes);
        }
      });
  }
  function handleDelete() {
    deletePost(id)
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        if (e) {
          navigate("/");
          setClick(false);
        } else {
          message.error("Error while Deleting");
          setClick(false);
        }
      });
  }
  useEffect(() => {
    fetchPost();
    axios
      .post(`${url}/checkLike`, {
        id: JSON.stringify(id),
        username: JSON.stringify(currentUser.username),
      })
      .then(function (response) {
        if (response.data) {
          setLiked(true);
        }
      });
  }, []);

  const showDate = new Date(data.created_date || "");
  return (
    <div className="w-full  flex flex-col gap-2 ">
      <h1 className="text-2xl font-semibold m-0">{data?.topic}</h1>

      <div className="mx-2">
        {data.content === null || data.content === undefined
          ? null
          : parse(data.content)}
      </div>
      <div>
        {data.imgUrl === "undefined" ||
        data.imgUrl === undefined ||
        data.imgUrl === null ? null : (
          <Image
            className="object-cover"
            alt="logo"
            height={500}
            src={`${url}/img/${data.imgUrl}`}
          />
        )}
      </div>
      <div className=" flex gap-2 mt-5">
        <Link to={`/user/${data.username}`}>{data?.username}</Link>
        {showDate.toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })}
      </div>
      <div className="flex flex-row gap-2 mt-2">
        <Button
          className="flex justify-center items-center gap-1"
          disabled={liked}
          onClick={() => {
            const username = currentUser.username;
            const postId = id;
            likePost({ postId, username });
            setLikes(likesonPost + 1);
            setLiked(true);
          }}
        >
          {likesonPost == 0 ? null : likesonPost}
          <LikeFilled
            className={`${!liked ? "text-black" : "text-blue-800"}`}
          />
        </Button>
        {currentUser.username === data.username ? (
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
    </div>
  );
};

export default Post;
