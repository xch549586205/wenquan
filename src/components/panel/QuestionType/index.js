import { useState, useRef } from "react";
import { questionTypes } from "../../../mock";
import { Tag } from "antd";
import style from "./index.less";
import Draggable from "react-draggable";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { setMouseData } = props;

  const groupingQuestionTypes = (() => {
    const tags = [];
    questionTypes.map(({ name, group, icon, questionId }) => {
      if (!tags.filter((tag) => tag.groupName === group).length) {
        tags.push({ groupName: group, groupTags: [] });
      }
      const key = tags.findIndex((value) => value.groupName === group);
      if (key !== -1) {
        tags[key].groupTags.push({ name, icon, questionId });
      }
    });
    return tags;
  })();

  const [mouseIndex, setMouseIndex] = useState([-1, -1]);

  const onDrag = (_event, uiData, draggleRef) => {
    const obj = _event.type === "touchmove" ? _event.touches[0] : _event;
    const { clientX, clientY } = obj;

    // 订阅给content questionList
    //鼠标滑动时，更新鼠标位置

    setMouseData({
      clientX,
      clientY,
      type: "move",
    });
  };

  const onStop = (_event, uiData, draggleRef, questionId) => {
    const isClick =
      uiData.node.style.transform === "" ||
      uiData.node.style.transform === "translate(0px, 0px)";
    if (isClick) {
      // 订阅给content questionList

      setMouseData({
        type: "click",
        questionId,
      });

      return;
    }
    const obj = _event.type === "touchend" ? _event.changedTouches[0] : _event;
    const { clientX, clientY } = obj;

    // 订阅给content questionList
    setMouseData({
      clientX,
      clientY,
      type: "stop",
      questionId,
    });

    // 被拖拽的题型tag回到初始位置
    uiData.x = 0;
    uiData.y = 0;
    draggleRef.current.state.x = 0;
    draggleRef.current.state.y = 0;
    setTimeout(() => {
      uiData.node.style.transform = null;
      draggleRef.current.state.x = 0;
      draggleRef.current.state.y = 0;
    }, 200);
  };

  return (
    <div>
      {groupingQuestionTypes.map(({ groupName, groupTags }, i) => {
        return (
          <div key={"groupName" + i}>
            <p> {groupName}</p>
            <div>
              {groupTags.map(({ name, icon, questionId }, j) => {
                const draggleRef = useRef(null);
                return (
                  <Draggable
                    ref={draggleRef}
                    key={"tag" + i + j}
                    onStart={() => setMouseIndex([i, j])}
                    onDrag={(_event, uiData) =>
                      onDrag(_event, uiData, draggleRef)
                    }
                    onStop={(_event, uiData) => {
                      setMouseIndex([-1, -1]);
                      onStop(_event, uiData, draggleRef, questionId);
                    }}
                  >
                    <Tag
                      icon={icon}
                      color={
                        i === mouseIndex[0] && j === mouseIndex[1]
                          ? "#1DA57A"
                          : ""
                      }
                      className={style.tag}
                      onMouseEnter={() => setMouseIndex([i, j])}
                      onMouseLeave={() => setMouseIndex([-1, -1])}
                    >
                      {name}
                    </Tag>
                  </Draggable>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
