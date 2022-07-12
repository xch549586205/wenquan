import React, { useRef, useEffect } from "react";
import style from "./index.less";
import { UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { Row, Col, Avatar, Popover, Button } from "antd";
import { useNavigate } from "react-router-dom";

function Layout(props) {
  const layoutRef = useRef(null);
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : {};
  const navigate = useNavigate();
  useEffect(() => {
    props.updateLayoutHeight(layoutRef.current.offsetHeight || 0);
  });
  function PopoverContent() {
    return (
      <div>
        <div>
          <Button type="primary" onClick={() => {}}>
            修改信息
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            danger
            onClick={() => {
              Cookies.remove("userInfo");
              navigate("/login", { replace: true });
            }}
          >
            退出
          </Button>
        </div>
      </div>
    );
  }
  return (
    <Row ref={layoutRef} className={style.layout}>
      <Col span={12}></Col>
      <Col span={12} className={style.right}>
        <div></div>
        <div className={style.Avatar}>
          <Popover content={<PopoverContent />} title={userInfo.account}>
            <Avatar size="small" icon={<UserOutlined />} />
          </Popover>
          {userInfo.account}
        </div>
      </Col>
    </Row>
  );
}

export default Layout;
