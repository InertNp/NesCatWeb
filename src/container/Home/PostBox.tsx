import { Image, List } from "antd";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { Actions } from "./BoxActions";
import { contentComponent } from "../../utilities/truncatedDescription";

export interface dataType {
  postId: number;
  topic: string;
  // likes,
  content?: string;
  username?: string;
  imgUrl?: string;
  created_date?: string;
}

export const PostBox = ({
  postId,
  topic,
  // likes,
  content,
  username,
  imgUrl,
  created_date,
}: dataType) => {
  const data = {
    postId: postId,
    // likes: likes,
    username: username,
    date: created_date,
  };

  return (
    <List.Item key={postId} actions={[<Actions {...data} />]}>
      <div className="w-full h-full flex flex-col lg:flex-row items-center lg:items-start relative ">
        {/* id of post */}
        <p className="absolute top-0 right-0 lg:left-0 text-light text-sm">{`${postId}`}</p>
        {/* title and content */}
        <div className="flex flex-col pt-10 w-full items-start  ">
          <div className="font-bold text-xl text-start">{parse(topic)}</div>
          <div className="font-normal text-md overflow-hidden text-start  p-2">
            {content === null || content === undefined
              ? null
              : parse(contentComponent(content))}
          </div>
          <Link to={`/post/${postId}`}>View More</Link>
        </div>
        {/* image */}
        {imgUrl === "undefined" || imgUrl === null ? null : (
          <Image
            className="object-cover max-w-[200px] md:min-w-[200px] lg:min-w-[200px]"
            alt="logo"
            src={`http://localhost:9000/img/${imgUrl}`}
          />
        )}
      </div>
      {/* author */}
      <div className="w-full flex gap-2 items-center justify-start ">
        <Link
          className="capitalize font-semibold text-black hover:text-blue-400 text-md "
          to={`user/${username}`}
        >{`${username}`}</Link>
        <p className="capitalize ">{` Jan 2 ,1001 AD`}</p>
      </div>
    </List.Item>
  );
};
