//给题型分组
export const grouping = (questionTypes) => {
  const tags = [];
  questionTypes.map(({ name, group, icon, id }) => {
    if (!tags.filter((tag) => tag.groupName === group).length) {
      tags.push({ groupName: group, groupTags: [] });
    }
    const key = tags.findIndex((value) => value.groupName === group);
    if (key !== -1) {
      tags[key].groupTags.push({ name, icon, id });
    }
  });
  return tags;
};
