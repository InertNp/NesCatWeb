import { Layout } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import NavBar from "./container/Header/NavBar"
import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Sider from "antd/es/layout/Sider"
import { useGlobalState } from "./hooks/GlobalHooks"
import { SiderMenu } from "./container/Sider/SiderMenu"
import Login from "./Pages/Login"
import Notify from "./Pages/Notify"
import AddPost from "./Pages/AddPost"

function App() {
  const [isLoggedIn] = useGlobalState('isLoggedIn');

  return (
    <>
      <Layout className="min-h-screen " hasSider={false}   >
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
      </Layout >
    </>
  )
}

export default App
