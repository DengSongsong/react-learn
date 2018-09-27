import { h, render, Component } from "preact";
import cs from "classnames";
import "./tip.less";

let defaultOpt = {
  wrapId: "tip_modal"
};

class TipModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { type, msg } = this.props;
    return (
      <div className={cs("tip_container animated slideInDown", type)}>
        {msg}
      </div>
    );
  }
}
let timer = null;
const Tip = {
  show(type, msg, duratime) {
    let target = document.getElementById(defaultOpt.wrapId);
    if (!target) {
      target = document.createElement("div");
      target.setAttribute("id", defaultOpt.wrapId);
      target.setAttribute("class", "tip_modal_root");
      document.body.appendChild(target);
    }
    this.hide();
    timer && clearTimeout(timer);
    if (target.hasChildNodes()) {
      return false;
    }
    render(<TipModal msg={msg} type={type} />, target);

    if (duratime) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        this.hide();
      }, duratime);
    }
  },
  hide() {
    let target = document.getElementById(defaultOpt.wrapId);
    if (target) target.innerHTML = "";
  },
  success(msg, duration) {
    this.show("success", msg, duration);
  },
  showLoading(msg) {
    this.show("loading", msg);
  },
  error(msg, duration) {
    this.show("error", msg, duration);
  },
  loading(msg, duration) {
    this.show("loading", msg, duration);
  }
};

export default Tip;
