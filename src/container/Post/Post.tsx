import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
interface data {
  id: any;
  author: Function;
}
interface dataType {
  topic?: string;
  content: string;
  imgUrl?: string;
}
const Post = ({ id, author }: data) => {
  const [data, setData] = useState({} as dataType);
  // console.log(data);
  const navigate = useNavigate();
  function fetchPost() {
    fetch("http://localhost:9000/fullpost", {
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
        }
      });
  }

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="w-full  flex flex-col gap-2 ">
      <h1 className="text-5xl m-0">{data?.topic}</h1>
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
            src={`http://localhost:9000/img/${data.imgUrl}`}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
