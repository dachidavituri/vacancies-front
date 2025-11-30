import React from "react";
import { Form, Input, Button, message } from "antd";
import { useLogin } from "@/react-query/mutation/auth";
import type { LoginFormProps } from "./index.types";

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [form] = Form.useForm();
  const loginMutation = useLogin();

  const onFinish = (values: { email: string; password: string }) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.access_token);
        message.success("Logged in successfully");
        if (onLoginSuccess) onLoginSuccess();
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 12,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Admin Login</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
