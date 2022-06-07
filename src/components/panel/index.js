import { useState } from "react";
import style from "./index.less";
import QuestionContent from "./QuestionContent";
import QuestionType from "./QuestionType";
import { Button, Layout } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import propTypes from "prop-types";

const { Header, Content, Footer, Sider } = Layout;
function Panel(props) {
  const { direction = "row" } = props;
  const isPhone = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  return (
    <div className={direction === "row" ? style.panelRow : style.panelCol}>
      {/* <Button type="primary" className={style.Affix}>
        <AppstoreAddOutlined />
      </Button> */}
      {isPhone && direction === "row" && (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <QuestionType direction={direction} />
        </Sider>
      )}
      {(!isPhone || direction !== "row") && (
        <QuestionType direction={direction} isPhone={isPhone} />
      )}
      <QuestionContent direction={direction} />
    </div>
  );
}

Panel.propTypes = {
  //面板方向 row column
  direction: propTypes.string,
};
export default Panel;
