import { useState, useRef } from "react";
import { questionTypes } from "@/mock";
import { Tag } from "antd";
import style from "./index.less";
import Draggable from "react-draggable";
// import { Droppable } from "react-beautiful-dnd";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
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

  const onStop = (_event, uiData, draggleRef) => {
    console.log(_event, uiData, draggleRef);

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
                    onStop={(_event, uiData) => {
                      setMouseIndex([-1, -1]);
                      onStop(_event, uiData, draggleRef);
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
