import emitter from "./emitter";
import axios from "axios";
class Preload extends emitter {
  constructor(options) {
    super(options);
    this.sorcseCache = new Map();
    this.readyFns = [];
    this.hash = new Date().valueOf();
  }
  ready(fn) {
    if (this.isLoaded) {
      fn && fn();
    } else {
      this.readyFns.push(fn);
    }
  }
  get Cache() {
    return this.sorcseCache;
  }
  ins(key) {
    return this.sorcseCache.get(key).ins;
  }
  c(key) {
    return this.sorcseCache.get(key).url;
  }
  startLoad(opt) {
    let rawKeys = Array.isArray(opt.sourse) ? opt.sourse : [opt.sourse];
    let imgArr = [];
    if (opt.adaptFn) {
      imgArr = rawKeys.map(v => opt.adaptFn(v) + "?" + this.hash);
    }
    let len = imgArr.length;
    let progress = 0;
    for (let i = 0; i < len; i++) {
      this.xhrload(imgArr[i], rawKeys[i]).then(item => {
        progress++;
        this.emit("progress", (progress / len).toFixed(2) * 100);
        this.sorcseCache.set(rawKeys[i], item);
        if (progress >= len) {
          this.emit("complete", this.sorcseCache);
          for (let i = 0; i < this.readyFns.length; i++) {
            this.readyFns[i].call(this);
          }
          this.readyFns = [];
        }
      });
    }
  }

  xhrload(url, rawKey) {
    return new Promise((resolve, reject) => {
      let ext = rawKey.slice(rawKey.lastIndexOf(".") + 1);
      let sourceType;
      if (ext == "mp3" || ext == "ogg" || ext == "wav") {
        sourceType = "sound";
      } else if (
        ext == "jpg" ||
        ext == "jpeg" ||
        ext == "png" ||
        ext == "gif"
      ) {
        sourceType = "image";
      } else if (ext == "css") {
        sourceType = "css";
      } else if (ext == "mp4") {
        sourceType = "video";
      } else if (ext == "svg") {
        sourceType = "svg";
      } else if (ext == "xml") {
        sourceType = "xml";
      } else if (ext == "json") {
        sourceType = "json";
      } else if (ext == "txt") {
        sourceType = "text";
      } else if (ext == "js" || ext == "swf") {
        sourceType = "js";
      } else {
        sourceType = "unKnow";
      }
      let responseType = "text";
      if (
        sourceType == "image" ||
        sourceType == "sound" ||
        sourceType == "video"
      ) {
        responseType = "blob";
      }

      axios({
        url: url,
        method: "get",
        responseType: responseType
      })
        .then(data => {
          let result = data.data;
          var reader = new FileReader();
          reader.onload = function(e) {
            if (sourceType == "sound") {
              let ins = document.createElement("AUDIO");
              ins.preload = true;
              ins.src = e.target.result;

              resolve({
                ins: ins,
                url: e.target.result,
                type: sourceType
              });
            } else if (sourceType == "image") {
              var ins = new Image();
              ins.crossOrigin = "Anonymous";
              ins.onload = function() {
                resolve({
                  ins: ins,
                  url: e.target.result,
                  type: sourceType
                });
              };
              ins.src = e.target.result;
            } else if (sourceType == "VIDEO") {
              let ins = document.createElement("VIDEO");
              ins.preload = true;
              ins.src = e.target.result;
              resolve({
                ins: ins,
                url: e.target.result,
                type: sourceType
              });
            }
          };
          reader.readAsDataURL(result);
        })
        .catch(err => {
          resolve({
            url: url,
            data: url,
            type: sourceType
          });
        });
    });
  }
}

export default new Preload();
