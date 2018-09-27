const path = require("path");
const webpack = require("webpack");
const pkg = require("../package.json");
const config = require("./project.config");

module.exports = {
  mode: "production",
  context: config.path.distDir,
  entry: {
    vendor: config.dllChunks || Object.keys(pkg.dependencies)
  },
  output: {
    path: config.path.distDir,
    filename: "[name].dll.js",
    library: "_dll_[name]"
  },
  resolve: {
    alias: {}
  },
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: config.path.distDir + "/manifest.json",
      context: process.cwd()
    })
  ]
};
