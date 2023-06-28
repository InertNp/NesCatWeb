import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../container/UserDetail/UserLayout";
import { setGlobalState } from "../hooks/GlobalHooks";

const UserDetail = () => {
  const { username } = useParams();
  console.log(username);
  const [info, setInfo] = useState([]);
  function fetchData() {
    fetch("http://localhost:9000/userInfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => {
        return response.json();
      })
      .then((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    fetchData();
    setGlobalState("loading", false);
    // return setGlobalState("loading", true);
  });
  console.log(username);
  return <div>"somtehitng"</div>;
};

export default UserDetail;
