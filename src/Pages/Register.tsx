import { Alert, Button, Form, Input, Space } from "antd";

import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { setGlobalState } from "../hooks/GlobalHooks";
import useMessage from "antd/es/message/useMessage";
import { useNavigate } from "react-router-dom";
import { regexpPass, usernameRegexp } from "../utilities/passwordRegx";
import { url } from "../data/url";

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
      fetch(`${url}/checkUsername`, {
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
    fetch(`${url}/reg`, {
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
            rules={[
              { required: true, message: "Please input your name!" },
              { min: 5, message: "Must be more than 5 characters" },
            ]}
          >
            <Input className="w-full" type="text" placeholder="John doe" />
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
              { min: 5, message: "Must be more than 5 characters" },
              {
                pattern: usernameRegexp,
                message: "Username can't have Special Characters",
              },
            ]}
            validateStatus={validate}
          >
            <Input
              className="w-full"
              type="text"
              value={username}
              onChange={checkUsername}
              placeholder="johndoe999"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="w-[90%]"
            rules={[
              {
                type: "email",
                message: "Enter Correct Email format abc@abc.com ",
              },
              { required: true, message: "Input your email ." },
            ]}
          >
            <Input className="w-full" placeholder="abc123@abc.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="w-[90%]"
            rules={[
              {
                pattern: regexpPass,
                message:
                  "Password must include atleast 1 uppcase,number and special character",
              },
              {
                required: true,
                min: 5,
                message: "Password must be more then 5 characters",
              },
            ]}
          >
            <Input.Password className="w-full" placeholder="Password" />
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
