import store from "store";
import axios from "axios";
console.log(store);

export const fetchWechatUserInfo = openid => {
  return axios.get(
    `//oauthbiz.lizhi.fm/weixin/loadUser?tag=brand&openid=${openid}`
  );
};

export const userInfo = () => {
  return store.get("userInfo");
};

export const webOuth = link => {
  if (!link) {
    return false;
  }
  if (!store.get("openId")) {
    let openId = getUrlParms("openid");
    if (openId) {
      store.set("openId", openId);
      fetchWechatUserInfo(openId).then(response => {
        store.set("userInfo", response.data.data);
        location.href = store.get("originUrl");
        store.remove("originUrl");
      });

      return true;
    } else {
      store.set("originUrl", location.href);
      window.location.href =
        "//oauthbiz.lizhi.fm/weixin/wechatAuth2?tag=brand&redirectURL=" +
        encodeURIComponent(link);
      return false;
    }
  }
  return true;
};

export const jsconfig = link => {
  axios
    .get("//oauthbiz.lizhi.fm/weixin/jsconfig?tag=brand&currentURL=" + link)
    .then(response => {
      console.log(response.data.data);
      let data = response.data.data;
      console.log(data);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appid, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "hideMenuItems",
          "showMenuItems",
          "hideAllNonBaseMenuItem",
          "showAllNonBaseMenuItem",
          "translateVoice",
          "startRecord",
          "stopRecord",
          "onRecordEnd",
          "playVoice",
          "pauseVoice",
          "stopVoice",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getNetworkType",
          "openLocation",
          "getLocation",
          "hideOptionMenu",
          "showOptionMenu",
          "closeWindow",
          "scanQRCode",
          "chooseWXPay",
          "openProductSpecificView",
          "addCard",
          "chooseCard",
          "openCard"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });
};
function getUrlParms(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
