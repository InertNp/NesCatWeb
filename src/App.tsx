import { Layout } from "antd"
import { Content, Header, Footer } from "antd/es/layout/layout"


function App() {


  return (
    <>
      <Layout className="min-h-screen" >
        <Header>hello world</Header>
        <Content> this is content</Content>
        <Footer>this is footer</Footer>
      </Layout>
    </>
  )
}

export default App
