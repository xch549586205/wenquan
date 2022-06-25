import { useState, createRef, useEffect, useRef } from "react";
import style from "./index.less";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import InputItem from "../../InputItem";
import classNames from "classnames";
import { Empty } from "antd";
import Item from "./Item";

function List(props) {
  const [newItemIndex, setNewItemIndex] = useState(-1);
  
  const {
    list,
    updateList,
    mouseData,
    questionTypes,
    globalOptions,
    updateGlobalOptions,
    currentId,
    setCurrentId,
  } = props;

  const createItem = (id) => {
    const questionType = questionTypes.filter((q) => q.id === id)[0];
    return {
      name: questionType.name,
      title: "请选择一个选项",
      id: questionType.id,
      options: ["选项1", "选项2", "选项3"],
      required: true,
      id: new Date().getTime() + "",
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
    const { clientX, clientY, type, id } = mouseData;

    //列表的宽高
    const { clientWidth } = contentRef.current;
    const { scrollTop } =
      contentRef.current.parentElement.parentElement.parentElement
        .parentElement;
    // 列表对于窗口的左偏移
    const { offsetLeft } = contentRef.current.offsetParent;
    if (type === "stop") {
      setNewItemIndex(-1);
    }
    //纯点击
    if (id && type === "click") {
      addItem(id, list.length + 1);
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
          addItem(id);
        }
      }
    } else {
      if (type === "stop" && clientX > 0 && clientY > 0 && isMouseInBox) {
        addItem(id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseData]);

  useEffect(() => {
    document.onmousedown = function (e) {
      let clickOther = true;
      e.path.map((dom) => {
        if (dom.className && dom.className.indexOf(style.itemLi) !== -1) {
          clickOther = false;
        }
      });
      if (clickOther) {
        setTimeout(() => {
          setCurrentId(null);
        });
      }
    };
  }, []);

  // 拖动添加题型时，鼠标拖动到某个item的样式变化
  const isDrapIntoStyle = (index) => {
    if (index === 0 && newItemIndex === 0) {
      return style.intoQuestionFirst;
    }
    if (index + 1 === newItemIndex) {
      return style.intoQuestion;
    } else {
      return style.itemLi;
    }
  };

  const addItem = (id, _newItemIndex = newItemIndex) => {
    const newItem = createItem(id);
    const _list = [...list];
    const newList = [..._list.splice(0, _newItemIndex), newItem, ..._list];
    updateList(newList);
    setNewItemIndex(-1);
  };

  const changeTitle = (titleType, value) => {
    updateGlobalOptions({
      ...globalOptions,
      [titleType]: value,
    });
  };

  const changeOption = (index, optionIndex, value) => {
    const item = list[index];
    const options = JSON.parse(item.options);
    const { option } = options;
    const newOption = [...option];
    const { editQuestion } = props;

    return {
      edit: () => {
        if (optionIndex !== -1) {
          newOption[optionIndex] = value;
        } else {
          newOption.push(value);
        }
        editQuestion({
          id: item.id,
          options: JSON.stringify({
            ...options,
            option: newOption,
          }),
        });
      },
      delete: () => {
        newOption.splice(optionIndex, 1);
        editQuestion({
          id: item.id,
          options: JSON.stringify({
            ...options,
            option: newOption,
          }),
        });
      },
    };
  };

  const changeItemTitle = (index, value) => {
    const { editQuestion } = props;
    const item = list[index];
    editQuestion({
      id: item.id,
      title: value,
      options: item.options,
    });
  };

  const contentRef = createRef(null);

  return (
    <div className={style.content}>
      <div className={style.item}>
        <InputItem
          className={style.title}
          hideDelete
          value={globalOptions.title}
          change={(value) => changeTitle("title", value)}
        />
        <InputItem
          value={globalOptions.subTitle}
          hideDelete
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
                        key={question.id + i}
                        draggableId={question.id + ""}
                        index={i}
                      >
                        {(_provided) => {
                          const isActive = currentId === question.id;
                          return (
                            <div
                              className={classNames({
                                [style.currentId]: isActive,
                                [style.itemLi]: true,
                                [isDrapIntoStyle(i)]: true,
                              })}
                              onClick={() => {
                                if (currentId !== question.id) {
                                  setCurrentId(question.id);
                                }
                              }}
                            >
                              <Item
                                changeItemTitle={changeItemTitle}
                                question={question}
                                index={i}
                                _provided={_provided}
                                changeOption={changeOption}
                                currentId={currentId}
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
   * 当前点击的题目的id
   */
  currentId: PropTypes.number,
  /**
   * 更新当前点击的题目的id，提供给Setting组件使用
   */
  setCurrentId: PropTypes.func,
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
