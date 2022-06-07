import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./index.less";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateCurrentData } from "@/reducer/questions/question";
function Content(props) {
  const currentData = useSelector((state) => state.question.currentData);

  const dispatch = useDispatch();

  const { questionList } = currentData;
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
    dispatch(
      updateCurrentData({
        ...currentData,
        questionList: items,
      })
    );
  };
  console.log(questionList, "questionList");

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Your target */}
      <Droppable droppableId="id">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {questionList.map((question, i) => {
              return (
                <Draggable
                  key={question.name}
                  draggableId={question.name}
                  index={i}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div key={"question" + i}>{question.name}</div>{" "}
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default Content;
