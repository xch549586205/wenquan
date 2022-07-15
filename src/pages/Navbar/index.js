import React, { useRef, useEffect } from "react";
import style from "./index.less";
import { UserOutlined, LeftOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { Row, Col, Avatar, Popover, Button, Layout } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import routers from "@@/src/router";

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  const filertPath = paths.filter((r) => r.breadcrumbName);
  return last && route.breadcrumbName ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
  );
}

const { Header } = Layout;
function NavBar(props) {
  const layoutRef = useRef(null);
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : {};
  const navigate = useNavigate();
  useEffect(() => {
    console.log(layoutRef.current.offsetHeight);
    props.updateNavbarHeight(layoutRef.current.offsetHeight || 0);
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
    <Header ref={layoutRef} className={style.header}>
      <Row className={style.navbar}>
        <Col span={12} className={style.left}>
          <div className={style.backIcon} onClick={() => navigate(-1)}>
            <LeftOutlined />
          </div>
          <Breadcrumb
            itemRender={itemRender}
            routes={routers.filter((r) => r.breadcrumbName)}
          />
        </Col>
        <Col span={12} className={style.right}>
          <div></div>
          <div className={style.Avatar}>
            <Popover content={<PopoverContent />} title={userInfo.account}>
              <Avatar size="small" icon={<UserOutlined />} />
              {userInfo.account}
            </Popover>
          </div>
        </Col>
      </Row>
    </Header>
  );
}

export default NavBar;
