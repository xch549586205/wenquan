/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import style from "./index.less";
const Login = (props) => {
  const onFinish = (values) => {
    props.login(values);
  };

  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      className={style["login-form"]}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入账户!" }]}
      >
        <Input
          prefix={<UserOutlined className={style["site-form-item-icon"]} />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input
          prefix={<LockOutlined className={style["site-form-item-icon"]} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a href="" className={style["login-form-forgot"]}>
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={style["login-form-button"]}
        >
          登录
        </Button>
        或者 <a onClick={props.goRegister}>注册</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
