import { Image, List } from "antd";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { Actions } from "./BoxActions";
import { contentComponent } from "../../utilities/truncatedDescription";

export interface dataType {
  postId: number;
  topic: string;
  likes: number;
  content?: string;
  username?: string;
  imgUrl?: string;
  created_date?: string;
}

export const PostBox = ({
  postId,
  topic,
  likes,
  content,
  username,
  imgUrl,
  created_date,
}: dataType) => {
  const data = {
    postId: postId,
    likes: likes,
    username: username,
    date: created_date,
  };

  const showDate = new Date(created_date || "");

  return (
    <List.Item
      key={postId}
      actions={[<Actions {...data} />]}
      className="flex flex-row  "
    >
      <Link
        to={`/post/${postId}`}
        className="capitalize text-xl font-semibold p-0 m-0 text-slate-700 hover:text-sky-700  "
      >
        {topic}
      </Link>

      <div className="font-light mt-0 p-0">
        {content === null || content === undefined
          ? null
          : parse(contentComponent(content))}
      </div>
      {imgUrl === "undefined" || imgUrl === null ? null : (
        <Image
          className="object-cover max-w-[400px]"
          alt="logo"
          src={`http://localhost:9000/img/${imgUrl}`}
        />
      )}
      <div className="w-full flex gap-2 items-center justify-start ">
        <Link
          className="capitalize font-semibold text-black hover:text-blue-400 text-md "
          to={`user/${username}`}
        >{`${username}`}</Link>
        <p className="capitalize ">
          {showDate.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </p>
      </div>
    </List.Item>
  );
};
