import { useState, createRef, useEffect } from "react";
import style from "./index.less";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import InputItem from "../../../InputItem";
import classNames from "classnames";
import { Empty, Tooltip } from "antd";
import dragIcon from "./images/drag.svg";
import { DeleteOutlined } from "@ant-design/icons";
function List(props) {
  const [newItemIndex, setNewItemIndex] = useState(-1);

  const {
    list,
    updateList,
    mouseData,
    questionTypes,
    setCurrentIndex,
    globalOptions,
    updateGlobalOptions,
  } = props;
  const createItem = (questionId) => {
    const questionType = questionTypes.filter(
      (q) => q.questionId === questionId
    )[0];
    return {
      name: questionType.name,
      title: "请选择一个选项",
      questionId: questionType.questionId,
      options: ["选项1", "选项2", "选项3"],
      required: true,
    };
  };
  // 拖动停止时换位
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list); // 此处需要深拷贝
      result[startIndex] = list[endIndex];
      result[endIndex] = list[startIndex];
      return result;
    };
    const items = reorder(list, result.source.index, result.destination.index);
    updateList(items);
  };

  // 监听题型的鼠标拖动
  useEffect(() => {
    const { clientX, clientY, type, questionId } = mouseData;

    //列表的宽高
    const { clientWidth } = contentRef.current;
    const { scrollTop } =
      contentRef.current.parentElement.parentElement.parentElement
        .parentElement;
    // console.log(contentRef.current.clientHeight);
    // 列表对于窗口的左偏移
    const { offsetLeft } = contentRef.current.offsetParent;
    if (type === "stop") {
      setNewItemIndex(-1);
    }
    //纯点击
    if (questionId && type === "click") {
      addItem(questionId, list.length + 1);
      return;
    }
    const questionNodeList = contentRef.current.childNodes[0].childNodes;
    const range = [...questionNodeList].map((_node, index) => {
      return {
        pos: _node.offsetTop - scrollTop + _node.clientHeight / 2 - clientY,
        index,
      };
    });
    // 判断鼠标是否在列表box的左右范围内
    const isMouseInBox =
      clientX > offsetLeft && clientX < clientWidth + offsetLeft;
    if (range.length) {
      //通过鼠标位置 筛选鼠标在哪个item的范围内
      const sortRange = range.sort((a, b) => Math.abs(a.pos) - Math.abs(b.pos));
      const minRange = sortRange[0];
      const _newItemIndex =
        minRange.pos > 0 ? minRange.index : minRange.index + 1;

      // 得到新item的index
      if (clientX > 0 && clientY > 0 && isMouseInBox) {
        setNewItemIndex(_newItemIndex);
        if (type === "stop") {
          addItem(questionId);
        }
      }
    } else {
      if (type === "stop" && clientX > 0 && clientY > 0 && isMouseInBox) {
        addItem(questionId);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseData]);

  // 拖动添加题型时，鼠标拖动到某个item的样式变化
  const isDrapIntoStyle = (index) => {
    if (index === 0 && newItemIndex === 0) {
      return style.intoQuestionFirst;
    }
    if (index + 1 === newItemIndex) {
      return style.intoQuestion;
    } else {
      return style.question;
    }
  };

  const addItem = (questionId, _newItemIndex = newItemIndex) => {
    const newItem = createItem(questionId);
    const _list = [...list];
    const newList = [..._list.splice(0, _newItemIndex), newItem, ..._list];
    updateList(newList);
    setNewItemIndex(-1);
  };

  const changeTitle = (titleType, value) => {
    console.log(titleType, value);
    updateGlobalOptions({
      ...globalOptions,
      [titleType]: value,
    });
  };

  function Item(props) {
    const { className, question, index, _provided } = props;
    const changeItem = (prop, newVal) => {
      const newList = [...list];
      newList[index] = {
        ...newList[index],
        [prop]: newVal,
      };
      updateList(newList);
    };
    return (
      <div
        className={classNames({
          [style.item]: true,
          [className]: className,
        })}
      >
        <div className={style.itemTitle}>
          <span>*</span>
          <span>{index}</span>
          <InputItem
            value={question.name}
            change={(value) => changeItem("name", value)}
          />
          <div className={style.itemTitleIcons}>
            <Tooltip title="长按拖动题目">
              <div className={style.dragIcon} {..._provided.dragHandleProps}>
                <img src={dragIcon} alt="dragIcon" />
              </div>
            </Tooltip>

            <div className={style.deleteIcon}>
              <DeleteOutlined />
            </div>
          </div>
        </div>

        {question.name}
      </div>
    );
  }
  const contentRef = createRef(null);
  return (
    <div className={style.content}>
      <div className={style.item}>
        <InputItem
          className={style.title}
          value={globalOptions.title}
          change={(value) => changeTitle("title", value)}
        />
        <InputItem
          value={globalOptions.subTitle}
          change={(value) => changeTitle("subTitle", value)}
        />
      </div>
      {Boolean(!list.length) && (
        <Empty description={"点击题型或把题型拖入此区域"} />
      )}
      <div ref={contentRef} className={style.list}>
        <DragDropContext onDragEnd={onDragEnd} key={JSON.stringify(list)}>
          <Droppable droppableId="id">
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {list.map((question, i) => {
                    return (
                      <Draggable
                        key={question.questionId + i}
                        draggableId={question.questionId + i}
                        index={i}
                        dataType={"list" + i}
                      >
                        {(_provided) => {
                          return (
                            <div
                              onClick={() => setCurrentIndex(i)}
                              ref={_provided.innerRef}
                              {..._provided.draggableProps}
                              className={
                                props.currentIndex === i
                                  ? style.currentIndex
                                  : ""
                              }
                            >
                              <Item
                                _provided={_provided}
                                question={question}
                                className={isDrapIntoStyle(i)}
                                index={i}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

List.propTypes = {
  /**
   * 题目列表数据
   */
  list: PropTypes.array,
  /**
   * 需要监听的鼠标拖动事件，用来判断拖动添加题型
   */
  mouseData: PropTypes.object,
  /**
   * 更新题目列表数据
   */
  updateList: PropTypes.func,
  /**
   * 更新当前点击的索引，提供给Setting组件使用
   */
  setCurrentIndex: PropTypes.func,
  /**
   * 全局的一些配置，List组件主要是获取 标题title、副标题subtitle
   */
  globalOptions: PropTypes.object,
};
List.defaultProps = {
  list: [],
  mouseData: {},
};

export default List;
