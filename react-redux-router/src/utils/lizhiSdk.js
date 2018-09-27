// jsconfig(location.href);
if (lz.isApp) {
  lz.config({
    debug: true,
    // url: "https://h5security.lizhi.fm/jsBridgeConfig/get",
    apiList: [
      "getToken",
      "getSessionUser",
      "gotoLogin",
      "shareUrl",
      "startRecordVoice",
      "stopRecordVoice",
      "uploadRecordVoice",
      "replayRecordVoice",
      "shareImage",
      "saveImage"
    ],
    eventList: ["user:login"],
    apiMiddlewares: [],
    eventMiddlewares: [],
    other: {}
  });
  lz.on("sign", r => {
    if (r.status === "success") {
      const { step, ret, rets } = r.data;
      switch (step) {
        case "getUdid": // 获取udid成功
          break;
        case "getSign": // 获取签名成功
          break;
        case "requestVerifySign": // 请求校验签名成功
          break;
        case "verifySignFinish": // 签名校验通过，签名完成
          break;
      }
    } else {
      window.alert(`签名在进行到${r.data.step}的时候失败！`);
    }
  });
  console.log("lz.isReady");
  console.log(lz.isReady);
  setTimeout(() => {
    console.log("lz.isReady");
    console.log(lz.isReady);
  }, 3000);
  lz.ready(() => {
    alert("bridge is ready!");
  });
}
