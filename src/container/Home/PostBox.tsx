import { Image, List } from "antd";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { descriptionComponent } from "../../utilities/truncatedDescription";
import { Actions } from "./BoxActions";

export interface dataType {
  id: number;
  title: string;
  likes?: number;
  imgUrl?: string;
  avatar?: string;
  author?: string;
  authorID?: number;
  description?: string;
  date?: Date;
}

export const PostBox = ({
  id,
  title,
  likes,
  authorID,
  author,
  description,
  imgUrl,
  date,
}: dataType) => {
  const data = {
    id: id,
    title: title,
    likes: likes,
    authorID: authorID,
    author: author,
    date: date,
  };

  return (
    <List.Item key={id} actions={[<Actions {...data} />]}>
      <div className="w-full h-full flex flex-col lg:flex-row items-center lg:items-start relative ">
        {/* id of post */}
        <p className="absolute top-0 right-0 lg:left-0 text-light text-sm">{`${id}`}</p>
        {/* title and description */}
        <div className="flex flex-col pt-10 w-full items-start  ">
          <div className="font-bold text-xl text-start">{parse(title)}</div>
          <div className="font-normal text-md overflow-hidden text-start  p-2">
            {description === null || description === undefined
              ? null
              : parse(descriptionComponent(description))}
          </div>
          <Link to={`/post/${id}`}>View More</Link>
        </div>
        {/* image */}
        {imgUrl === "undefined" || imgUrl === null ? null : (
          <Image
            className="object-cover max-w-[300px] md:min-w-[300px] lg:min-w-[300px]"
            alt="logo"
            src={`http://localhost:9000/img/${imgUrl}`}
          />
        )}
      </div>
      {/* author */}
      <div className="w-full flex gap-2 items-center justify-start ">
        <Link
          className="capitalize font-semibold text-black hover:text-blue-400 text-md "
          to={`user/${author}`}
        >{`${author}`}</Link>
        <p className="capitalize ">{` Jan 2 ,1001 AD`}</p>
      </div>
    </List.Item>
  );
};
