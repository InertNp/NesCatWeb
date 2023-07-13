import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../data/url";

const Popular = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${url}/popular`).then(function (response) {
      setData(response.data);
    });
  }, []);
  return (
    <div className="px-10">
      <h1>Trending</h1>
      <div className="flex flex-col gap-2">
        {data === null || data === undefined
          ? null
          : data.map((item: any) => {
              return (
                <Link
                  key={item.postId}
                  className={`text-blue-900 hover:text-blue-600`}
                  to={`/post/${item.postId}`}
                >
                  {item.topic}
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Popular;
