import { Layout, Spin } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import NavBar from "./container/Header/NavBar"
import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Sider from "antd/es/layout/Sider"
import { setGlobalState, useGlobalState } from "./hooks/GlobalHooks"
import { SiderMenu } from "./container/Sider/SiderMenu"
import Login from "./Pages/Login"
import Notify from "./Pages/Notify"
import AddPost from "./Pages/AddPost"
import { useEffect } from "react"

function App() {
  const [isLoggedIn] = useGlobalState('isLoggedIn');
  const [loading] = useGlobalState('loading');

  useEffect(() => {
    const iniloggedIn = localStorage.getItem('isLoggedIn');
    const loggedIn = iniloggedIn !== null ? true : false;
    const data = localStorage.getItem('data');
    const finalData = data !== null ? JSON.parse(data) : {};

    setGlobalState('isLoggedIn', loggedIn)
    setGlobalState('currentUser', { ...finalData })
    setGlobalState('loading', false)
  }, [isLoggedIn])


  return (
    <>
      <Layout className="min-h-screen " hasSider={false}   >
        <Spin spinning={loading} wrapperClassName="w-full h-full">
          <Header className="bg-white flex"  >
            <NavBar />
          </Header>
          <Layout hasSider={(isLoggedIn) ? true : false} >
            {(isLoggedIn) ?
              <Sider theme={'light'} collapsed={true} className="hidden md:block">
                <SiderMenu />
              </Sider>
              : null}

            <Content className="w-full h-full flex justify-center" >
              <div className="w-[95%] min-h-full flex ">
                <Routes>
                  <Route element={(isLoggedIn) ? <Home /> : <Login />} path="/*" />
                  {(isLoggedIn) ?
                    <>
                      <Route element={<Home />} path="/home" />
                      <Route element={<Notify />} path="/notification" />
                      <Route element={<AddPost />} path="/AddPost" />
                    </> :
                    <>
                      <Route element={<Login />} path="/login" />
                      <Route element={<Login />} path="/register" />
                    </>
                  }
                </Routes>
              </div>
            </Content>

          </Layout>
        </Spin>
      </Layout >
    </>
  )
}

export default App
