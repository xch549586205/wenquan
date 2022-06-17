组件效果:

```jsx
const groupingQuestionTypes = [
  {
    groupName: "group1",
    groupTags: [
      {
        name: "question1",
        questionId: "001",
      },
      {
        name: "question2",
        questionId: "002",
      },
      {
        name: "question3",
        questionId: "003",
      },
      {
        name: "question4",
        questionId: "004",
      },
    ],
  },
  {
    groupName: "group2",
    groupTags: [
      {
        name: "question1",
        questionId: "005",
      },
      {
        name: "question2",
        questionId: "006",
      },
    ],
  },
];
<QuestionType groupingQuestionTypes={groupingQuestionTypes} />;
```
