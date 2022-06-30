组件效果:

```jsx
import "antd/dist/antd.css";
let groupingQuestionTypes = [
  {
    groupName: "选择题",
    groupid: 1,
    groupTags: [
      {
        name: "多选题",
        id: 2,
        groupid: 1,
      },
      {
        name: "单选题",
        id: 3,
        groupid: 1,
      },
    ],
  },
];
<QuestionType
  groupingQuestionTypes={groupingQuestionTypes}
  setMouseData={() => {}}
/>;
```
