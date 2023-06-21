import { Alert, Button, Form, Input, Space } from "antd";

import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { setGlobalState } from "../hooks/GlobalHooks";
import useMessage from "antd/es/message/useMessage";
import { useNavigate } from "react-router-dom";

type vali = "success" | "" | "error";

const Register = () => {
  const navigate = useNavigate();
  const [message, text] = useMessage();
  const [form] = useForm();
  const [username] = useState("");
  const [error, setError] = useState(false);
  const [validate, setValidate] = useState<vali>("");
  function checkUsername(e: any) {
    const userlength = e.target.value;

    const value = {
      username: userlength,
    };

    if (userlength.length >= 5) {
      fetch("http://localhost:9000/checkUsername", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((response) => {
          return response.json();
        })
        .then((e) => {
          if (e === true) {
            setValidate("error");
          } else {
            setValidate("success");
          }
        });
    }
  }
  const onFinish = (values: any) => {
    setGlobalState("loading", true);
    fetch("http://localhost:9000/reg", {
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
        setGlobalState("loading", false);
        if (e === "true" || e === true) {
          message.success("Account Created Successfully");
          form.resetFields();
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      });
  };

  return (
    <div className="w-full flex justify-center my-10">
      {text}
      <div className="flex w-[90%] h-full justify-center items-center  ">
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
          className="flex flex-col rounded-lg justify-center items-center shadow-lg w-[100%] sm:w-{100%} md:w-[70%] lg:w-[50%] "
        >
          <h1 className="text-2xl">Register Form</h1>
          <Form.Item
            label="Name"
            name="name"
            className="w-[90%]"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              className="w-full"
              type="text"
              placeholder="John doe"
              minLength={5}
            />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            className="w-[90%]"
            rules={[
              {
                required: true,
                message:
                  "Please input your Username! Must be more then 5 letter",
              },
            ]}
            validateStatus={validate}
          >
            <Input
              className="w-full"
              type="text"
              value={username}
              onChange={checkUsername}
              placeholder="johndai999"
              minLength={5}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="w-[90%]"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              className="w-full"
              type="email"
              placeholder="abc123@abc.com"
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
              minLength={6}
            />
          </Form.Item>

          {error ? (
            <Space
              direction="vertical"
              style={{ width: "90%" }}
              className="my-2"
            >
              <Alert
                message="Password Not Same"
                type="error"
                closable
                onClose={() => setError(false)}
              />
            </Space>
          ) : null}

          <Form.Item className="w-[90%] flex justify-center items-center">
            <Button
              type="primary"
              htmlType="submit"
              className="px-20"
              disabled={
                validate === "error" || username.length >= 5 ? true : false
              }
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
