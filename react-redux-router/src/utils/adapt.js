import lz from "@lizhife/lz-jssdk";
import tool from "@lizhife/client";
import { resolve } from "url";
console.log(tool);
export const startRecord = () => {
  if (tool.isLizhiFM()) {
    lz.ready(() => {
      lz.startRecordVoice({ type: 2 }).then(data => {
        console.log(data);
      });
    });
  } else if (tool.isWeiXin()) {
    wx.ready(() => {
      wx.startRecord();
    });
  }
};
export const saveRecord = () => {
  return new Promise((resolve, reject) => {
    if (tool.isLizhiFM()) {
      lz.ready(() => {
        lz.stopRecordVoice({
          isNeedUpload: true //是否上传录音
        }).then(data => {
          resolve(data);
        });
      });
    } else if (tool.isWeiXin()) {
      wx.stopRecord({
        success: function(res) {
          wx.uploadVoice({
            localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res2) {
              console.log(res2);
              resolve(res2.serverId);
            }
          });
        }
      });
    }
  });

  console.log("endRecord");
};
export const cancelRecord = () => {
  if (tool.isLizhiFM()) {
    lz.ready(() => {
      lz.stopRecordVoice({
        isNeedUpload: false //是否上传录音
      }).then(data => {
        console.log(data);
      });
    });
  } else if (tool.isWeiXin()) {
    wx.stopRecord({
      success: function(res) {
        console.log(res);
        var localId = res.localId;
      }
    });
  }

  console.log("endRecord");
};
