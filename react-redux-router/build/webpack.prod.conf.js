"use strict";

const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制静态资源的插件
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清空打包目录的插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html的插件
const webpack = require("webpack");
const baseConfig = require("./webpack.base.conf");
const merge = require("webpack-merge");
const safeParser = require("postcss-safe-parser");
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const config = require("./project.config");
module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    publicPath: config.cdnPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: config.path.publicDir + "/index.html",
      filename: "index.html",
      chunks: ["index", "vendors", "default"],
      // hash: true,
      templateParameters: config.htmlParamProd
    }),
    new CleanWebpackPlugin(["dist"], {
      root: config.path.contextPath,
      exclude: ["manifest.json", "vendor.dll.js"],
      verbose: true,
      dry: false
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        parser: safeParser,
        discardComments: {
          removeAll: true
        }
      }
    }),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
    new BundleAnalyzerPlugin()
  ]
});
