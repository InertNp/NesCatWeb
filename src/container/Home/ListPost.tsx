import { DislikeFilled, LikeFilled, MoreOutlined } from "@ant-design/icons";
import { Button, Image, List } from "antd";
import { Link } from "react-router-dom";

export interface dataType {
  id?: number;
  title?: string;
  likes?: number;
  imgUrl?: string;
  avatar?: string;
  author?: string;
  authorID?: number;
  description?: string;
}

const ListPost = ({
  id,
  title,
  likes,
  authorID,
  author,
  description,
  imgUrl,
}: dataType) => {
  return (
    <List.Item
      key={title}
      actions={[
        <div className="flex gap-2 justify-center items-center ">
          <Button className="flex gap-2 justify-center items-center">
            {likes}
            <LikeFilled />
          </Button>
          <Button>
            <DislikeFilled />
          </Button>

          <MoreOutlined
            style={{ fontSize: "20px" }}
            className="rounded-full text-black hover:text-blue-600 p-2 hover:shadow-md hover:bg-slate-50"
          />

          <Link
            className="capitalize font-bold "
            to={`profile/:${authorID}`}
          >{`${author}`}</Link>
          <p className="capitalize  ">{` Jan 2 ,1001 AD`}</p>
        </div>,
      ]}
    >
      <div className="w-full h-full flex flex-col lg:flex-row items-start  justify-between   relative ">
        <p className="absolute top-0 right-0 lg:left-0 text-light text-sm">{`${id}`}</p>
        <div className="flex flex-col mt-4">
          <h1 className="font-bold text-xl text-start w-full">{title}</h1>
          <p className="font-normal text-md overflow-hidden text-start w-full">
            {description === null || description === undefined
              ? null
              : description}
          </p>
        </div>
        {imgUrl === undefined || imgUrl === null ? null : (
          <Image
            height={400}
            width={400}
            className="object-cover md:min-w-[300px] lg:min-w-[400px] "
            alt="logo"
            src={`http://localhost:9000/img/${imgUrl}`}
          />
        )}
      </div>
    </List.Item>
  );
};

export default ListPost;
