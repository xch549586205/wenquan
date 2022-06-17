import { useState, createRef, useEffect } from "react";
import style from "./index.less";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

function List(props) {
  const [newItemIndex, setNewItemIndex] = useState(-1);

  const {
    list,
    updateList,
    mouseData,
    questionTypes,
    setCurrentIndex,
    globalOptions,
  } = props;
  const createItem = (questionId) => {
    const questionType = questionTypes.filter(
      (q) => q.questionId === questionId
    )[0];
    return {
      name: questionType.name,
      questionType: questionType.questionType,
      questionId: questionType.questionId,
      options: ["选项1", "选项2", "选项3"],
      checked: [],
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
    const { clientWidth, clientHeight, offsetTop } = contentRef.current;
    const { scrollTop } =
      contentRef.current.parentElement.parentElement.parentElement
        .parentElement;
    // console.log(contentRef.current.clientHeight);
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
        pos:
          _node.offsetTop +
          offsetTop -
          scrollTop +
          _node.clientHeight / 2 -
          clientY,
        index,
      };
    });
    //通过鼠标位置 筛选鼠标在哪个item的范围内
    const sortRange = range.sort((a, b) => Math.abs(a.pos) - Math.abs(b.pos));
    const minRange = sortRange[0];
    const _newItemIndex =
      minRange.pos > 0 ? minRange.index : minRange.index + 1;

    // 判断鼠标是否在列表box范围内
    const isMouseInBox =
      clientX > offsetLeft &&
      clientX < clientWidth + offsetLeft &&
      clientY > offsetTop &&
      clientY < clientHeight + offsetTop;

    // 得到新item的index
    if (clientX > 0 && clientY > 0 && isMouseInBox) {
      setNewItemIndex(_newItemIndex);
      if (type === "stop") {
        addItem(questionId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseData]);

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

  const contentRef = createRef(null);

  return (
    <div className={style.content}>
      <div className={style.title}> {globalOptions.title}</div>
      <div className={style.subTitle}> {globalOptions.subTitle}</div>
      <div ref={contentRef} className={style.list}>
        <DragDropContext onDragEnd={onDragEnd} key={list.length}>
          {/* Your target */}
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
                              ref={_provided.innerRef}
                              {..._provided.draggableProps}
                              onClick={() => setCurrentIndex(i)}
                              {..._provided.dragHandleProps}
                            >
                              <div
                                key={"question" + i}
                                className={isDrapIntoStyle(i)}
                              >
                                {question.name}
                              </div>
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
