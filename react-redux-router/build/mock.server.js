const Koa = require("koa");
const Router = require("koa-router");
const config = require("./project.config");
const app = new Koa();
const router = new Router();
const globby = require("globby");
const path = require("path");
let mockApis = globby.sync(["**/*"], {
  cwd: path.resolve(__dirname, "../mock")
});

let cache = new Map();
mockApis.forEach(v => {
  let regexPath = v.slice(0, v.lastIndexOf(".")).replace("_", "/");
  let data = require(path.resolve(__dirname, "./" + v));
  cache.set(regexPath, data);
  router.all(`/${regexPath}`, (ctx, next) => {
    if (cache.has(regexPath)) {
      ctx.body = cache.get(regexPath);
    } else {
      ctx.body = "mock data not exsit";
    }
  });
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(config.mock.port);
console.log("mock server is running in port " + config.mock.port);
