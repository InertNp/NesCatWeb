import { useEffect } from "react";
import Popular from "../container/Home/Popular";
import ShowPost from "../container/Home/ShowPost";
import { useGlobalState } from "../hooks/GlobalHooks";
import axios from "axios";
import { dateCreate } from "../utilities/DateCreate";
import { message } from "antd";

const Home = () => {
  const [currentUser] = useGlobalState("currentUser");

  useEffect(() => {
    const date = dateCreate();

    axios
      .post("http://localhost:9000/online", {
        id: JSON.stringify(currentUser.userId),
        date: date,
      })
      .then(function (res) {
        if (res.data === false) {
          message.warning("An Unknown Error has occured");
        }
      });
  }, []);
  return (
    <div className="flex pr-20 pl-0 ">
      <div className="basis-2/6">
        <Popular />
      </div>
      <div className="basis-4/6">
        <ShowPost />
      </div>
    </div>
  );
};

export default Home;
