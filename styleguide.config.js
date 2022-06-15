var webpack = require("webpack");

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === "true") {
    return false;
  }

  try {
    require.resolve("react/jsx-runtime");
    return true;
  } catch (e) {
    return false;
  }
})();
module.exports = {
  components: "src/components/**/*.js",
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            customize: require.resolve(
              "babel-preset-react-app/webpack-overrides"
            ),
            presets: [
              [
                require.resolve("babel-preset-react-app"),
                {
                  runtime: hasJsxRuntime ? "automatic" : "classic",
                },
              ],
            ],

            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            // See #6846 for context on why cacheCompression is disabled
            cacheCompression: false,
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // webpack自带该插件，无需单独安装
        "process.env": {
          NODE_ENV: process.env.NODE_ENV, // 将属性转化为全局变量，让代码中可以正常访问
        },
      }),
    ],
  },
};
