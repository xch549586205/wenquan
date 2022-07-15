const path = require("path");

function createItems() {
  let _items = require.context("./", true, /.js$/);
  let _itemsKeys = _items.keys();
  const modules = {};
  _itemsKeys.forEach((key) => {
    if (key !== "./index.js") {
      const name = path.basename(key, ".js");
      modules[name] = _items(key).default || _items(key);
    }
  });
  return modules;
}

const Items = createItems();

//该文件夹下的所有js 集成为一个object Items
export default Items;
