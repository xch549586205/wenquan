//给题型分组
export const grouping = (questionTypes) => {
  const tags = [];
  questionTypes.map(({ name, groupid, icon, id }) => {
    if (
      groupid === 0 &&
      !tags.filter((tag) => tag.groupid === groupid).length
    ) {
      tags.push({ groupName: name, groupid: id, groupTags: [] });
    }
    const key = tags.findIndex((value) => groupid === value.groupid);
    if (key !== -1) {
      tags[key].groupTags.push({ name, icon, id, groupid: tags[key].groupid });
    }
  });
  console.log(tags);
  return tags;
};

export const defaultData_questionType = {
  单选题: {
    title: "请选择一个选项",
    options: {
      option: ["选项1", "选项2", "选项3"],
    },
  },
  多选题: {
    title: "请选择以下选项 (多选)",
    options: {
      option: ["选项1", "选项2", "选项3"],
    },
  },
};
