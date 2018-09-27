import Emiter from "./emitter";

const defaultOpts = {
  size: {
    width: 500,
    height: 500
  }
};
class CanvasPaper extends Emiter {
  constructor(options) {
    super(options);
    this.options = Object.assign({}, defaultOpts, options);
    this.canvas = null;
    this.context = null;
    this.initContext();
  }
  // 画方法
  async doDraw(opt) {
    // 清空画布
    this.doReset();
    for (let i = 0; i < opt.length; i++) {
      if (opt[i].type == "img") {
        await this.drawImage(opt[i]);
      } else if (opt[i].type == "text") {
        await this.drawText(opt[i]);
      }
    }
    let base64 = this.toBase64(this.canvas, 1);
    return base64;
  }
  async drawText(textInfo) {
    this.context.font = textInfo.style.font;
    this.context.fillStyle = textInfo.style.color;
    this.context.textAlign = textInfo.style.align || "left";
    let text = textInfo.content.split("--");
    let lh = textInfo.style.lineHeight || 0;

    for (let i = 0; i < text.length; i++) {
      this.context.fillText(
        text[i],
        textInfo.style.x,
        textInfo.style.y + i * lh
      );
    }
  }
  async drawImage(imgInfo) {
    let imgobj = await this.loadImg(imgInfo.content);
    this.context.drawImage(
      imgobj,
      imgInfo.style.x,
      imgInfo.style.y,
      imgInfo.style.w,
      imgInfo.style.h
    );
  }
  doReset() {
    let cxt = this.context;
    cxt.clearRect(0, 0, this.options.size.width, this.options.size.height);
    if (this.options.backgroudColor) {
      cxt.fillStyle = this.options.backgroudColor;
      cxt.beginPath();
      cxt.fillRect(0, 0, this.options.size.width, this.options.size.height);
      cxt.closePath();
    }
  }
  loadImg(url) {
    let that = this;
    return new Promise(function(resolve, reject) {
      var image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = function() {
        resolve(image);
      };
      image.onerror = function(err) {
        that.emit("error", err);
        reject(err);
      };
      image.src = url;
    });
  }
  initContext() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.options.size.width;
    this.canvas.height = this.options.size.height;
    this.context = this.canvas.getContext("2d");
  }
  toBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  toBase64(canvas, quantity) {
    return canvas.toDataURL("data:image/png", quantity);
  }
}

export default CanvasPaper;
