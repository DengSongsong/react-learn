import axios from "axios";

// console.log("process.env");
// console.log(process.env);
const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 14000
});
axios.defaults.timeout = 6000;
export const addAudio = param => {
  return instance.get("viewvioce/addAudio", { params: param });
};

export const getAudioUrl = mediaId => {
  return axios.get(`//oauthbiz.lizhi.fm/transWechatAudioNew`, {
    params: {
      media_id: mediaId,
      tag: "brand"
    }
  });
};
