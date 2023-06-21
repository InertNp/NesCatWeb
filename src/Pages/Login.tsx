import { Alert, Button, Form, Input, Space } from "antd";
import { setGlobalState } from "../hooks/GlobalHooks";

import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form] = useForm();

  const [error, setError] = useState(false);
  const onFinish = (values: any) => {
    setGlobalState("loading", true);
    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((e) => {
        if (e === "false") {
          setError(true);
        } else {
          const data = e[0];
          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("isLoggedIn", "true");
          setGlobalState("isLoggedIn", true);
          setGlobalState("currentUser", data);
          navigate("/");
        }
        setGlobalState("loading", false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex w-full h-full justify-center items-center my-20">
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
        className="flex flex-col rounded-lg justify-center items-center shadow-lg w-[100%] sm:w-{100%} md:w-[70%] lg:w-[50%] "
      >
        <h1 className="text-2xl">Login Form</h1>

        <Form.Item
          label="Username"
          name="username"
          className="w-[90%]"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            className="w-full"
            type="text"
            placeholder="Username"
            minLength={5}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          className="w-[90%]"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            className="w-full"
            placeholder="Password"
            minLength={5}
          />
        </Form.Item>

        {error ? (
          <Space direction="vertical" style={{ width: "90%" }} className="my-2">
            <Alert
              message="Incorrect Email or Password"
              type="error"
              closable
              onClose={() => setError(false)}
            />
          </Space>
        ) : null}

        <p className="w-[90%] text-center">
          Dont Have an Account?
          <Link to={"/register "} className="pl-2">
            Click Here
          </Link>
        </p>

        <Form.Item className="w-[90%] flex justify-center items-center">
          <Button type="primary" htmlType="submit" className="px-20">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
