/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Login from "@/components/LoginRegister/Login";
import Register from "@/components/LoginRegister/Register";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Cookies from "js-cookie";

const LoginRegister = () => {
  const [status, setStatus] = useState("login");
  const navigate = useNavigate();

  const login = async (value) => {
    const res = await api.loginRegister.login({
      account: value.username || value.phone,
      password: value.password,
    });
    if (res.data.errcode === 200 && res.data.errmsg === "Success") {
      message.success("登录成功！");
      if (res.data.data && res.data.data.length) {
        const userInfo = res.data.data[0];
        Cookies.set("userInfo", JSON.stringify({ ...userInfo }));
      }
      setTimeout(() => navigate("/main", { replace: true }), 200);
    } else {
      message.error(res.data.errmsg);
    }
  };
  const register = async (value) => {
    const res = await api.loginRegister.register({
      account: value.phone,
      phone: value.phone,
      password: value.password,
      status: "1",
      nickname: value.nickname,
    });
    if (res.data.errcode === 200 && res.data.errmsg === "Success") {
      message.success("注册成功！");
      setTimeout(() => setStatus("login"), 200);
    } else {
      message.error(res.data.errmsg);
    }
  };
  return (
    <div style={{ paddingTop: "200px" }}>
      {status === "login" && (
        <Login goRegister={() => setStatus("register")} login={login} />
      )}
      {status === "register" && (
        <Register goLogin={() => setStatus("login")} register={register} />
      )}
    </div>
  );
};

export default LoginRegister;
