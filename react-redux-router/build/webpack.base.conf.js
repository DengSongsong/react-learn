"use strict";
const path = require("path");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isProd = process.env.NODE_ENV == "production" ? true : false;
const config = require("./project.config");
const webpack = require("webpack");
function assetsPath(name) {
  return path.posix.join(config.assetsSubDirectory, name);
}
const manifest = require(path.resolve(__dirname, "../dist/manifest.json"));
let env = isProd ? config.prodEnv : config.devEnv;

// console.log(config.cdnPath);
module.exports = {
  context: config.path.contextPath,
  entry: {
    index: [config.path.srcDir + "/main.js"]
  },
  output: {
    path: config.path.distDir,
    filename: "assets/js/[name].js?[hash:7]"
  },
  resolve: {
    extensions: [".js", ".css", ".json", ".jsx", ".es"],
    alias: config.alias
  },
  externals: config.externals,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "css-hot-loader",
          !isProd ? "style-loader" : MiniCssExtractPlugin.loader,
          "happypack/loader?id=css"
        ],
        include: [config.path.srcDir],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          "css-hot-loader",
          !isProd ? "style-loader" : MiniCssExtractPlugin.loader,
          "happypack/loader?id=less"
        ],
        include: [config.path.srcDir],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: "happypack/loader?id=happy-babel-js",
        include: [config.path.srcDir],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: "url-loader",
          options: {
            // name: assetsPath("images/[name].[ext]"), // 图片输出的路径
            name: assetsPath("images/[name].[ext]"), // 图片输出的路径
            // name: assetsPath("images/[name].[hash:4].[ext]"), // 图片输出的路径
            limit: 10
            // publicPath: isProd ? config.cdnPath : "../../"
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("media/[name].[ext]")
          // name: assetsPath("media/[name].[hash:4].[ext]"),
          // name: assetsPath("media/[name].[ext]"),
          // publicPath: isProd ? config.cdnPath : "../../"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          // name: assetsPath("fonts/[name].[ext]"),
          name: assetsPath("fonts/[name].[ext]")
          // name: assetsPath("fonts/[name].[hash:4].[ext]"),
          // publicPath: isProd ? config.cdnPath : "../../"
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "async", // 控制webpack选择哪些代码块用于分割（其他类型代码块按默认方式打包）。有3个可选的值：initial、async和all。
      minSize: 30000, // 形成一个新代码块最小的体积
      maxSize: 0,
      minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数（默认配置的策略是不需要多次引用也可以被分割）
      maxAsyncRequests: 5, // 按需加载的代码块，最大数量应该小于或者等于5
      maxInitialRequests: 3, // 初始加载的代码块，最大数量应该小于或等于3
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        },
        vendors: {
          // 将所有来自node_modules的模块分配到一个叫vendors的缓存组
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 缓存组的优先级(priotity)是负数，因此所有自定义缓存组都可以有比它更高优先级
        },
        default: {
          minChunks: 2, // 所有重复引用至少两次的代码，会被分配到default的缓存组。
          priority: -20, // 一个模块可以被分配到多个缓存组，优化策略会将模块分配至跟高优先级别（priority）的缓存组
          reuseExistingChunk: true // 允许复用已经存在的代码块，而不是新建一个新的，需要在精确匹配到对应模块时候才会生效。
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin(env),
    new CopyWebpackPlugin([
      {
        from: config.path.publicDir,
        to: config.path.distDir,
        ignore: [".*", "*.html"]
      }
    ]),
    new webpack.DllReferencePlugin({
      manifest: manifest
    }),
    new HappyPack({
      id: "less",
      threadPool: happyThreadPool,
      use: ["css-loader", "postcss-loader", "resolve-url-loader", "less-loader"]
    }),
    new HappyPack({
      id: "css",
      threadPool: happyThreadPool,
      use: ["css-loader", "postcss-loader", "resolve-url-loader"]
    }),
    new HappyPack({
      id: "happy-babel-js",
      loaders: ["babel-loader?cacheDirectory=true"],
      threadPool: happyThreadPool
    }),
    new MiniCssExtractPlugin({
      filename: !isProd ? "[name].css" : "assets/css/[name].css"
      // chunkFilename: !isProd ? "[id].css" : "assets/css/[id].css"
    }),
    new ProgressBarPlugin({
      format:
        "build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
    })
  ],
  node: {
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
