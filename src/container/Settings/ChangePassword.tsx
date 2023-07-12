import { Button, Form, Input, Popover, message } from "antd";
import axios from "axios";
import { useGlobalState } from "../../hooks/GlobalHooks";
import { useState } from "react";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [click, setClick] = useState(false);
  const [currentUser] = useGlobalState("currentUser");
  function handleFinish(e: any) {
    console.log(e.nowPassword, e.newPassword);
    axios
      .post("http://localhost:9000/changePassword", {
        password: e.nowPassword,
        newPassword: e.newPassword,
        username: JSON.stringify(currentUser.username),
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data === true) {
          message.success("Password change Successful");
          setClick(false);
          form.resetFields();
        } else {
          console.log(response.data);
          message.error(response.data);
        }
      });
  }
  return (
    <Popover
      open={click}
      trigger={"click"}
      placement="bottom"
      onOpenChange={(open: boolean) => {
        setClick(open);
      }}
      content={
        <div className="flex justify-center gap-2">
          <Form onFinish={handleFinish}>
            <Form.Item
              label="Now Password"
              name={"nowPassword"}
              rules={[
                { required: true, message: "Please input your new Password" },
                { min: 5, message: "Password must be minimum 5 character" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="New Password"
              name={"newPassword"}
              rules={[
                { required: true, message: "Please input your new Password" },
                { min: 5, message: "Password must be minimum 5 character" },
              ]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Change
            </Button>
          </Form>
        </div>
      }
    >
      <Button>Change Password</Button>
    </Popover>
  );
};

export default ChangePassword;
