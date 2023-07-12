import { Button, List, Popover, message } from "antd";
import { useEffect, useState } from "react";
import showPosts from "../data/showPosts";
import { Link, useNavigate } from "react-router-dom";
import deletePost from "../data/deletePost";
import { useGlobalState } from "../hooks/GlobalHooks";
import { DeleteOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const [click, setClick] = useState(false);
  const [refreshPost, setRefreshPost] = useState(false);
  const navigate = useNavigate();
  const [currentUser] = useGlobalState("currentUser");
  const [data, setData] = useState([]);
  if (currentUser.userType === "admin") {
  } else {
    navigate("/");
  }
  const fetchPosts = () => {
    showPosts()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res.response);
        console.log(data);
      });
  };
  function handleDelete(postId: number) {
    deletePost(postId)
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        if (e) {
          navigate("/dashboard");
          setRefreshPost(!refreshPost);
          setClick(false);
        } else {
          message.error("Error while Deleting");
        }
      });
  }

  useEffect(() => {
    fetchPosts();
  }, [refreshPost]);
  return (
    <div>
      <List
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item key={item?.postId}>
            <List.Item.Meta
              title={<Link to={"/"}>{item.topic}</Link>}
              description={
                <div className="flex gap-2 items-center">
                  <p>Id:{item.postId}</p>
                  <p>Author:{item.username}</p>
                </div>
              }
            />

            <Popover
              open={click}
              content={
                <div className="flex justify-center gap-2">
                  <Button
                    type="default"
                    danger
                    onClick={() => handleDelete(item.postId)}
                  >
                    Yes
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setClick(false);
                    }}
                  >
                    No
                  </Button>
                </div>
              }
              title="Are you Sure?"
              trigger="click"
              onOpenChange={(open: boolean) => {
                setClick(open);
              }}
            >
              <Button type="primary" danger>
                <DeleteOutlined style={{ fontSize: "20px" }} />
              </Button>
            </Popover>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Dashboard;
