import { Button, Form, Input } from "antd";
import React from "react";
import style from "./index.less";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const App = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.register(values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      className={style["login-form"]}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="phone"
        label="手机号"
        rules={[
          {
            type: "phone",
            message: "请输入正确的手机号!",
          },
          {
            required: true,
            message: "请输入手机号!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "请输入密码!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "请再次输入密码!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的密码不一致!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="昵称"
        tooltip="怎么称呼您?"
        rules={[
          {
            required: true,
            message: "请输入昵称!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" onClick={props.goLogin}>
          返回
        </Button>
        <Button type="primary" htmlType="submit" style={{ marginLeft: "20px" }}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
