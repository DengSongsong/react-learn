const path = require("path");
module.exports = {
  mock: {
    port: 3000
  },
  proxy: {
    "http://127.0.0.1:8080/viewvioce/addAudio": {
      target: "http://mkactivitypre.lizhifm.com/",
      // target: "http://192.168.11.237:8090/",
      changeOrigin: true,
      secure: false
    }
  },
  // dllChunks: ["preact", "mobx", "mobx-react", "babel-polyfill"],
  port: 8082,
  host: "0.0.0.0",
  publicPath: "/",
  cdnPath: "https://bizadv.lizhi.fm/festatic/viewvioce/",
  assetsSubDirectory: "assets",
  htmlParam: {
    BASE_URL: "./"
  },
  htmlParamProd: {
    BASE_URL: "https://bizadv.lizhi.fm/festatic/viewvioce/"
  },
  prodEnv: {
    "process.env": {
      API_URL: JSON.stringify("http://mkactivity.lizhifm.com/"),
      MODE: JSON.stringify("producton"),
      NODE_ENV: JSON.stringify("production")
    }
  },
  devEnv: {
    "process.env": {
      API_URL: JSON.stringify("/api1"),
      MODE: JSON.stringify("development"),
      NODE_ENV: JSON.stringify("development")
    }
  },
  alias: {
    "@": path.resolve(__dirname, "../src")
  },
  externals: {
    rem: "rem",
    Swiper: "Swiper",
    Swiper: "window.Swiper"
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
