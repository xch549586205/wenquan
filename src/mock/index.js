const path = require("path");

function createMocks() {
  let _mocks = require.context("./", true, /.js$/);
  let _mocksKeys = _mocks.keys();
  const modules = {};
  _mocksKeys.forEach((key) => {
    if (key !== "./index.js") {
      const name = path.basename(key, ".js");
      modules[name] = _mocks(key).default || _mocks(key);
    }
  });
  return modules;
}

const mocks = createMocks();

export default mocks;
