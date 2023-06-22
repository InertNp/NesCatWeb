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
      <div className="w-full h-full flex flex-col lg:flex-row items-start  justify-between   relative ">
        <p className="absolute top-0 right-0 lg:left-0 text-light text-sm">{`${id}`}</p>
        <div className="flex flex-col pt-10 ">
          <div className="font-bold text-xl text-start w-full ">
            {parse(title)}
          </div>
          <div className="font-normal text-md overflow-hidden text-start w-full px-2">
            {description === null || description === undefined
              ? null
              : parse(descriptionComponent(description))}
          </div>
          <Link to={`/post/${id}`}>View More</Link>
        </div>
        {imgUrl === "undefined" || imgUrl === null ? null : (
          <Image
            className="object-cover max-w-[200px] md:min-w-[300px] lg:min-w-[300px] "
            alt="logo"
            src={`http://localhost:9000/img/${imgUrl}`}
          />
        )}
      </div>
    </List.Item>
  );
};
