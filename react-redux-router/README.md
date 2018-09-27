# 声音可视化

> npm start 开发环境
> npm run prod 生产环境

```
项目配置
module.exports = {
  mock: {
    port: 3000
  },
  proxy: {
    "/activityapi/*": {
      target: "https://vodactivity.lizhifm.com",
      changeOrigin: true,
      secure: false
    }
  },
  // dllChunks: ["preact", "mobx", "mobx-react", "babel-polyfill"],
  port: 80,
  host: "0.0.0.0",
  publicPath: "/",
  cdnPath: "./",
  assetsSubDirectory: "static",
  htmlParam: {
    BASE_URL: this.cdnPath
  },
  // for production
  env: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  alias: {
    "@": path.resolve(__dirname, "../src"),
    react: "preact-compat",
    "react-dom": "preact-compat"
  },
  externals: {
    rem: "rem"
  },
  path: {
    contextPath: path.resolve(__dirname, ".."),
    srcDir: path.resolve(__dirname, "../src"),
    distDir: path.resolve(__dirname, "../dist"),
    staticDir: path.resolve(__dirname, "../dist/static"),
    assetsDir: path.resolve(__dirname, "../dist/assetsDir"),
    publicDir: path.resolve(__dirname, "../public")
  }
};
```
