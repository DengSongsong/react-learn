'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const safeParser = require('postcss-safe-parser')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public') + '/index.html',
      filename: 'index.html',
      chunks: ["index", "vendors", "default"],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
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
})

module.exports = webpackConfig