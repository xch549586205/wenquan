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

export default Items;
