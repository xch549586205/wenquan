const path = require("path");

function createApis() {
  let _apis = require.context("./", true, /.js$/);
  let _aipsKeys = _apis.keys();
  const modules = {};
  _aipsKeys.forEach((key) => {
    if (key !== "./index.js") {
      const name = path.basename(key, ".js");
      modules[name] = _apis(key).default || _apis(key);
    }
  });
  return modules;
}

const api = createApis();

export default api;
