import { Layout, Spin } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import NavBar from "./container/Header/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

import { setGlobalState, useGlobalState } from "./hooks/GlobalHooks";

import Login from "./Pages/Login";
import Notify from "./Pages/Notify";
import AddPost from "./Pages/AddPost";
import Register from "./Pages/Register";
import { useEffect } from "react";
export const theme = {
  headerBg: "bg-white",
  text: "text-black",
};

function App() {
  const [isLoggedIn] = useGlobalState("isLoggedIn");
  const [loading] = useGlobalState("loading");

  useEffect(() => {
    const iniloggedIn = localStorage.getItem("isLoggedIn");
    const loggedIn = iniloggedIn == null ? false : true;
    setGlobalState("isLoggedIn", loggedIn);
    const data = localStorage.getItem("data");
    const finalData = data !== null ? JSON.parse(data) : {};
    setGlobalState("currentUser", { ...finalData });
    setGlobalState("loading", false);
  }, []);

  return (
    <Spin spinning={loading} wrapperClassName="w-full h-full">
      <Layout>
        <Header className={`${theme.headerBg} ${theme.text} `}>
          <NavBar />
        </Header>

        <Layout className="md:px-20 px-4 py-5">
          <Content className={` py-2 ${theme.headerBg} ${theme.text}`}>
            <Routes>
              <Route element={isLoggedIn ? <Home /> : <Login />} path="/*" />
              {isLoggedIn ? (
                <>
                  <Route element={<Home />} path="/" />
                  <Route element={<Notify />} path="/notification" />
                  <Route element={<AddPost />} path="/addPost" />
                </>
              ) : (
                <>
                  <Route element={<Login />} path="/" />
                  <Route element={<Login />} path="/login" />
                  <Route element={<Register />} path="/register" />
                </>
              )}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
}

export default App;
