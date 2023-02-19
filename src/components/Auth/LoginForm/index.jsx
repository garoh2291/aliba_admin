import "./styles.css";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import logo from "../../../assets/logo.jpg";
import { setUserThunk } from "../../../Redux/trackSlice";
import { useNavigate } from "react-router";
import {  message } from 'antd';

export const LoginForm = () => {
          const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cb = () => navigate("/", { replace: true });
        const error = (message) => {
    messageApi.open({
      type: 'error',
      content: `${message}`,
      duration:15,
      
    });
  };
  const onFinish = (values) => {
    dispatch(setUserThunk({ values, cb ,error}));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="form_wrapper">
        {contextHolder}  
      <div className="logo_wrapper">
        <img src={logo} alt="logo" />
      </div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              min: 4,
              message: "Username is short",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "Password is short",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
