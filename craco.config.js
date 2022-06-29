const CracoLessPlugin = require("craco-less");
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  // devServer: {
  //   proxy: {
  //     "/questionType": {
  //       target: "http://10.10.30.70:8686",
  //       changeOrigin: true,
  //     },
  //   },
  // },

  webpack: {
    alias: {
      "@@": pathResolve("."),
      "@": pathResolve("src"),
      crypto: false,
      stream: false,
      assert: false,
      http: false,
      https: false,
    },
    fallback: {
      path: require.resolve("path-browserify"),
    },
    plugins: [new NodePolyfillPlugin()],
  },
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "lib",
          style: "css",
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        //添加cssLoaderOptions代表模块化，不添加代表全局
        cssLoaderOptions: {
          modules: {
            localIdentName: "[local]_[hash:base64:5]",
          },
        },
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: new NodePolyfillPlugin(),
    },
  ],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};
