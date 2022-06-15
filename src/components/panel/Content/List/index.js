import { useState, createRef, useEffect } from "react";
import style from "./index.less";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateQuestionList } from "../../../../reducer/panel/panel";
import { questionTypes } from "../../../../mock";
import { useSelector, useDispatch } from "react-redux";

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

function List(props) {
  const [newItemIndex, setNewItemIndex] = useState(-1);

  const questionList = useSelector((state) => state.question.questionList);

  const dispatch = useDispatch();

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
    const items = reorder(
      questionList,
      result.source.index,
      result.destination.index
    );
    dispatch(updateQuestionList(items));
  };

  const mouseData = useSelector((state) => state.question.mouseData);

  // 监听题型的鼠标拖动
  useEffect(() => {
    const { clientX, clientY, type, questionId } = mouseData;
    //列表的宽高
    const { clientWidth, clientHeight } = contentRef.current;
    // 列表对于窗口的偏移
    const { offsetTop, offsetLeft } = contentRef.current.offsetParent;
    if (type === "stop") {
      setNewItemIndex(-1);
    }
    //纯点击
    if (questionId && type === "click") {
      addItem(questionId, questionList.length + 1);
      return;
    }
    const questionNodeList = contentRef.current.childNodes[0].childNodes;
    const range = [...questionNodeList].map((_node, index) => {
      return {
        pos: _node.offsetTop + offsetTop + _node.clientHeight / 2 - clientY,
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

  const isDrapInto = (index) => {
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
    const _questionList = [...questionList];
    const newList = [
      ..._questionList.splice(0, _newItemIndex),
      newItem,
      ..._questionList,
    ];
    dispatch(updateQuestionList(newList));
    setNewItemIndex(-1);
  };

  const contentRef = createRef(null);

  return (
    <div className={style.content}>
      <div className={style.title}> title...</div>
      <div ref={contentRef} className={style.list}>
        <DragDropContext onDragEnd={onDragEnd} key={questionList.length}>
          {/* Your target */}
          <Droppable droppableId="id">
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {questionList.map((question, i) => {
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
                              onClick={() => props.setMoreSetIndex(i)}
                              {..._provided.dragHandleProps}
                            >
                              <div
                                key={"question" + i}
                                className={isDrapInto(i)}
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

export default List;
