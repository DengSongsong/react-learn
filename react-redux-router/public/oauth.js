(function(link) {
  if (!link) {
    return false;
  }
  function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }
  if (!isWeiXin()) {
    return false;
  }

  if (!localStorage.getItem("openId")) {
    let openId = getUrlParms("openid");
    if (openId) {
      localStorage.setItem("openId", openId);
      location.href = localStorage.getItem("originUrl");
      localStorage.removeItem("originUrl");
      return true;
    } else {
      localStorage.setItem("originUrl", location.href);
      window.location.href =
        "//oauthbiz.lizhi.fm/weixin/wechatAuth2?tag=brand&redirectURL=" +
        encodeURIComponent(link);
      return false;
    }
  }
  return true;
})(location.href);
