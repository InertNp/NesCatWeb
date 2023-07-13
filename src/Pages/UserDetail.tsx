import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../container/UserDetail/UserLayout";
import { setGlobalState } from "../hooks/GlobalHooks";
import { url } from "../data/url";

const UserDetail = () => {
  const { username } = useParams();

  const [info, setInfo] = useState([]);
  function fetchData() {
    setGlobalState("loading", true);
    fetch(`${url}/userInfo`, {
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
        setInfo(e);
      });
  }

  useEffect(() => {
    fetchData();
    setGlobalState("loading", false);
  }, []);

  return <UserLayout data={info} />;
};
export default UserDetail;
