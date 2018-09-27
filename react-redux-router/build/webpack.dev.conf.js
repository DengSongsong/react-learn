const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.conf");
const merge = require("webpack-merge");
const config = require("./project.config");
const devWebpackConfig = merge(baseConfig, {
  mode: "development",
  output: {
    publicPath: config.publicPath,
    pathinfo: false
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hot: true,
    inline: true,
    contentBase: config.path.distDir,
    port: config.port || 8090,
    host: config.host || "0.0.0.0",
    compress: false,
    stats: "errors-only",
    overlay: true,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: config.proxy
  },
  watchOptions: {
    ignored: /node_modules/
    // aggregateTimeout: 500,
    // poll: 1000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: config.path.publicDir + "/index.html",
      filename: "index.html",
      chunks: ["index", "vendors", "default"],
      templateParameters: config.htmlParam
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});

module.exports = devWebpackConfig;
